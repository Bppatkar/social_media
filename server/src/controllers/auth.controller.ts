import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

import generateToken from '../utils/generateToken.js';
import asyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/ApiError.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // Validation
  if (!username || !email || !password) {
    throw new ApiError(400, 'Username, email and password are required');
  }

  if (username.length < 3) {
    throw new ApiError(400, 'Username must be at least 3 characters');
  }

  if (password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters');
  }

  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!emailRegex.test(email)) {
    throw new ApiError(400, 'Invalid email format');
  }

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

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    username: user.username,
  });

  // Response
  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});


export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    throw new ApiError(400, 'Email and password are required');
  }

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

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    username: user.username,
  });

  // Response
  res.status(200).json({
    message: 'Login successful',
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Logged out successfully',
  });
});
