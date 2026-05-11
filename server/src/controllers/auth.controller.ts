import type { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import {
  registerUserService,
  loginUserService,
  logoutUserService,
} from '../services/auth.service.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const data = await registerUserService(username, email, password);

  res.status(201).json(data);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUserService(email, password);

  res.status(200).json(data);
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  await logoutUserService();
  res.status(200).json({
    message: 'Logged out successfully',
  });
});
