import type { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import {
  registerUserService,
  loginUserService,
  logoutUserService,
  getUserProfileService,
  refreshAccessTokenService,
} from '../services/auth.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import type { AuthRequest } from '../types/auth.types.js';

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

  res
    .status(200)
    .json(new ApiResponse(true, 'user logged in successfully', data));
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  await logoutUserService();
  res.status(200).json(new ApiResponse(true, 'Logged out successfully', null));
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = req.user;
  res
    .status(200)
    .json(new ApiResponse(true, 'User retrieved successfully', user));
});

export const getUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.userId as string;
    const user = await getUserProfileService(userId);
    res
      .status(200)
      .json(new ApiResponse(true, 'User profile retrieved successfully', user));
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const data = await refreshAccessTokenService(refreshToken);

    return res
      .status(200)
      .json(new ApiResponse(true, 'Access token refreshed successfully', data));
  }
);
