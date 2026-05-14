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
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
  });

  await RefreshToken.create({
    user: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
  });

  // const token = generateToken({
  //   userId: user._id.toString(),
  //   username: user.username,
  // });

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

export const logoutUserService = async () => {
  // For JWT, logout is handled on the client side by deleting the token.
  // Optionally, you can implement token blacklisting on the server side if needed.
};

export const getUserProfileService = async (userId: string) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

export const refreshAcessTokenService = async (refreshToken: string) => {
  // verify jwt token
  const decoded = verifyRefreshToken(refreshToken) as JwtPayload;

  // Check if token exists in DB
  const existingToken = await RefreshToken.findOne({ token: refreshToken });

  if (!existingToken) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  // Token revoked [simply means - invalidate the token by deleting it from DB]
  if (existingToken.isRevoked) {
    // if existing token hai database mein but revoked hai, toh usko delete kar do
    // revoked ka matlab hai ki user ne logout kar diya hai, toh us token ko invalidate kar do
    throw new ApiError(401, 'Invalid refresh token');
  }

  // Token expired
  if (existingToken.expiresAt < new Date()) {
    throw new ApiError(401, 'Refresh token expired');
  }

  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  // generate new access token
  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    username: user.username,
  });

  return {
    accessToken,
  };
};
