import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // 1. Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Username, email and password are required',
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        message: 'Username must be at least 3 characters',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password must be at least 6 characters',
      });
    }
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Invalid email format',
      });
    }

    // 2. check existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({
        message: 'Username or email already exists',
      });
    }

    // 3. Hash password
    const hashedPass = await bcrypt.hash(password, 10);

    // 4. Create user
    const user = await User.create({
      username,
      email,
      password: hashedPass,
    });

    // 5. Respond with success
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message,
      });
    }
    if (error instanceof Error) {
      console.error('Error', error.message);
    }

    res.status(500).json({
      message: 'Login failed',
      error: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '7d',
      }
    );

    /* 
    | Token Type    | Expiry   |
    | ------------- | -------- |
    | Access Token  | 15m / 1h |
    | Refresh Token | 7d / 30d |
    */

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message,
      });
    }
    if (error instanceof Error) {
      console.error('Error', error.message);
    }

    res.status(500).json({
      message: 'Login failed',
      error: error.message,
    });
  }
};

export const logout = async (_req: Request, res: Response) => {
  try {
    // For JWT, the primary way to "logout" is for the client to delete the token.
    // On the server, we simply return a success message.
    res.status(200).json({
      message: 'Logged out successfully',
    });
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        message: error.message,
      });
    }
    if (error instanceof Error) {
      console.error('Error', error.message);
    }

    res.status(500).json({
      message: 'Login failed',
      error: error.message,
    });
  }
};
