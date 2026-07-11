import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

import ApiError from '../utils/ApiError.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import RefreshToken from '../models/RefreshToken.model.js';
import verifyRefreshToken from '../utils/verifyRefreshToken.js';
import type { JwtPayload } from 'jsonwebtoken';
import hashToken from '../utils/hashToken.js';
import findRefreshTokenSession from '../utils/findRefreshTokenSession.js';
import { logSecurityEvent, logInfo } from '../utils/logger.util.js';
import { deleteCache, getCache, setCache } from './redis.service.js';
import { deleteSingleImageService } from './media.service.js';
import Post from '../models/post.model.js';
import Comment from '../models/comment.model.js';
import Like from '../models/like.model.js';
import Notification from '../models/notification.model.js';
import Follow from '../models/follow.model.js';

export const registerUserService = async (
  username: string,
  email: string,
  password: string
) => {
  // Existing user check
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(400, 'Username or email already exists');
  }

  // Hash password
  const hashedPass = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    username,
    email,
    password: hashedPass,
  });

  // Generate access and refresh tokens

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
  });

  const hashedRefreshToken = await hashToken(refreshToken);

  await RefreshToken.create({
    user: user._id,
    token: hashedRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  // Response
  return {
    message: 'User registered successfully',
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};

export const loginUserService = async (email: string, password: string) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail });

  if (user?.lockUntil && user.lockUntil > new Date()) {
    throw new ApiError(
      // 423 - locked status code, indicates that the resource is currently locked and cannot be accessed
      423,
      'Account temporarily locked due to multiple failed login attempts'
    );
  }

  if (!user) {
    logSecurityEvent('Login attempt with non-existing email', {
      email,
    });

    throw new ApiError(400, 'Invalid email or password');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    logSecurityEvent('Invalid password attempt', {
      email,
    });

    user.failedLoginAttempts += 1;

    if (user.failedLoginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 5 * 60 * 1000);
      user.failedLoginAttempts = 0;
    }

    await user.save();

    throw new ApiError(400, 'Invalid email or password');
  }

  // Reseting counter on successful login
  user.failedLoginAttempts = 0;
  user.lockUntil = null;
  await user.save();

  // Generate access and refresh tokens
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
  });

  const hashedRefreshToken = await hashToken(refreshToken);

  await RefreshToken.create({
    user: user._id,
    token: hashedRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  // Response
  return {
    message: 'Login successful',
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};

export const logoutUserService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ApiError(400, 'Refresh token is missing');
  }
  const existingToken = await findRefreshTokenSession(refreshToken);

  if (!existingToken) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  existingToken.isRevoked = true;
  await existingToken.save();
};

export const getUserProfileService = async (
  userId: string,
  currentUserId: string
) => {
  const cacheKey = `user:${userId}`;

  const cachedUser = await getCache(cacheKey);
  if (cachedUser) {
    logInfo('Serving from Redis cache');
  }

  const [user, followersCount, followingCount, postsCount, isFollowing] =
    await Promise.all([
      User.findById(userId).select('-password'),
      Follow.countDocuments({ following: userId }),
      Follow.countDocuments({ follower: userId }),
      Post.countDocuments({ owner: userId }),
      currentUserId === userId
        ? Promise.resolve(false)
        : Follow.exists({ follower: currentUserId, following: userId }),
    ]);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  const profile = {
    ...user.toObject(),
    followersCount,
    followingCount,
    postsCount,
    isFollowing: Boolean(isFollowing),
  };

  await setCache(cacheKey, profile, 60);
  logInfo('Serving from MongoDB and caching in Redis');
  return profile;
};

export const refreshAccessTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token is required');
  }

  // verify jwt token
  const decoded = verifyRefreshToken(refreshToken) as JwtPayload;

  // Check if token exists in DB
  const existingToken = await findRefreshTokenSession(refreshToken);

  if (!existingToken) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  //* Token revoked [simply means - token is not valid anymore, and backend remove trust on that token]
  //? token stays in DB but marked as isRevoked = true, so that we can track token usage and revoke if needed
  if (existingToken.isRevoked) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  // Token expired
  if (existingToken.expiresAt < new Date()) {
    throw new ApiError(401, 'Refresh token expired');
  }

  existingToken.isRevoked = true;
  await existingToken.save();

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // generate new access token
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
  });

  const newRefreshToken = generateRefreshToken({
    userId: user._id.toString(),
  });

  const hashedNewRefreshToken = await hashToken(newRefreshToken);

  await RefreshToken.create({
    user: user._id,
    token: hashedNewRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const updateUserProfileService = async (
  userId: string,
  updateData: {
    username?: string;
    email?: string;
    bio?: string;
    profileImage?: string | undefined;
    profileImagePublicId?: string | undefined;
    coverImage?: string | undefined;
    coverImagePublicId?: string | undefined;
  }
) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  if (updateData.username) {
    const existingUsername = await User.findOne({
      username: updateData.username,
      _id: { $ne: userId }, // $ne - not equal operator, to exclude current user from the search
    });

    if (existingUsername) {
      throw new ApiError(400, 'Username already taken');
    }

    user.username = updateData.username;
  }

  if (updateData.email) {
    const existingEmail = await User.findOne({
      email: updateData.email,
      _id: { $ne: userId },
    });

    if (existingEmail) {
      throw new ApiError(400, 'Email already taken');
    }

    user.email = updateData.email;
  }

  if (updateData.bio) {
    user.bio = updateData.bio;
  }

  if (updateData.profileImage && updateData.profileImagePublicId) {
    if (user.profileImagePublicId) {
      await deleteSingleImageService(user.profileImagePublicId);
    }

    user.profileImage = updateData.profileImage;
    user.profileImagePublicId = updateData.profileImagePublicId;
  }

  if (updateData.coverImage && updateData.coverImagePublicId) {
    if (user.coverImagePublicId) {
      await deleteSingleImageService(user.coverImagePublicId);
    }

    user.coverImage = updateData.coverImage;
    user.coverImagePublicId = updateData.coverImagePublicId;
  }

  await user.save();

  await deleteCache(`user:${userId}`);

  const updatedUser = await User.findById(userId).select(
    '-password -failedLoginAttempts -lockUntil -__v -profileImagePublicId'
  );

  if (!updatedUser) {
    throw new ApiError(404, 'User not found');
  }

  return updatedUser;
};

export const deleteUserAccountService = async (userId: string) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const userPosts = await Post.find({ owner: userId }).select(
    '_id imagePublicId'
  );
  const postIds = userPosts.map((post) => post._id);

  const publicIds = [
    user.profileImagePublicId,
    user.coverImagePublicId,
    ...userPosts.map((post) => post.imagePublicId).filter(Boolean),
  ].filter(Boolean) as string[];

  await Promise.all(
    publicIds.map((publicId) => deleteSingleImageService(publicId))
  );

  await Promise.all([
    Post.deleteMany({ owner: userId }),
    Comment.deleteMany({
      $or: [{ commentedBy: userId }, { post: { $in: postIds } }],
    }),
    Like.deleteMany({ $or: [{ likedBy: userId }, { post: { $in: postIds } }] }),
    Notification.deleteMany({
      $or: [
        { recipient: userId },
        { sender: userId },
        { post: { $in: postIds } },
      ],
    }),
    Follow.deleteMany({ $or: [{ follower: userId }, { following: userId }] }),
    RefreshToken.deleteMany({ user: userId }),
    deleteCache(`user:${userId}`),
  ]);

  await user.deleteOne();

  return { success: true };
};

export const getMeService = async (userId: string) => {
  const user = await User.findById(userId).select(
    '-password -failedLoginAttempts -lockUntil -profileImagePublicId -__v'
  );

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user;
};
