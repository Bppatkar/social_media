import bcrypt from 'bcryptjs';

import User from '../models/user.model.js';

import generateToken from '../utils/generateToken.js';
import ApiError from '../utils/ApiError.js';

export const registerUserService = async (
  username: string,
  email: string,
  password: string
) => {
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
  return {
    message: 'User registered successfully',
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  };
};

export const loginUserService = async (email: string, password: string) => {
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
  return {
    message: 'Login successful',
    token,
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
