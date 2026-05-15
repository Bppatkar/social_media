import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

import ApiError from '../utils/ApiError.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import RefreshToken from '../models/RefreshToken.model.js';
import verifyRefreshToken from '../utils/verifyRefreshToken.js';
import type { JwtPayload } from 'jsonwebtoken';

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

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
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
  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, 'Invalid email or password');
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ApiError(400, 'Invalid email or password');
  }

  // Generate access and refresh tokens
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    username: user.username,
    role: user.role,
  });

  await RefreshToken.updateMany(
    {
      user: user._id,
    },
    { isRevoked: true }
  );

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
  });

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
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
  // receive refresh token
  // find token in DB and mark as revoked

  await RefreshToken.findOneAndUpdate(
    {
      token: refreshToken,
    },
    { isRevoked: true }
  );
};

export const getUserProfileService = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

export const refreshAccessTokenService = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token is required');
  }

  // verify jwt token
  const decoded = verifyRefreshToken(refreshToken) as JwtPayload;

  // Check if token exists in DB
  const existingToken = await RefreshToken.findOne({ token: refreshToken });

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

  await RefreshToken.create({
    user: user._id,
    token: newRefreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};
