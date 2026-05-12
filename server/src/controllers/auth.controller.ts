import type { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import {
  registerUserService,
  loginUserService,
  logoutUserService,
} from '../services/auth.service.js';
import ApiResponse from '../utils/ApiResponse.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const data = await registerUserService(username, email, password);

  res
    .status(201)
    .json(new ApiResponse(true, 'user registered successfully', data));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUserService(email, password);

  res.status(200).json(new ApiResponse(true, 'user logged in successfully', data));
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  await logoutUserService();
  res.status(200).json(new ApiResponse(true, 'Logged out successfully', null));
});
