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
import {
  accessTokenCookieOptions,
  clearTokenCookieOptions,
  refreshTokenCookieOptions,
} from '../utils/cookieOptions.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const data = await registerUserService(username, email, password);

  res
    .cookie('accessToken', data.accessToken, accessTokenCookieOptions)
    .cookie('refreshToken', data.refreshToken, refreshTokenCookieOptions)
    .status(201)
    .json(
      new ApiResponse(true, 'User registered successfully', { user: data.user })
    );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUserService(email, password);

  // setting refresh and access token in cookie
  // console.log(data,"logged in data");
  res
    .cookie('accessToken', data.accessToken, accessTokenCookieOptions)
    .cookie('refreshToken', data.refreshToken, refreshTokenCookieOptions)
    .status(200)
    .json(
      new ApiResponse(true, 'user logged in successfully', { user: data.user })
    );
  // now browser stores tokens in cookies and send them automatically with every request,  so response should mainly contain user data and success message, no need to send tokens in response body
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  await logoutUserService(refreshToken);

  res
    .clearCookie('accessToken', clearTokenCookieOptions)
    .clearCookie('refreshToken', clearTokenCookieOptions)
    .status(200)
    .json(new ApiResponse(true, 'Logged out successfully', null));
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
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(400)
        .json(new ApiResponse(false, 'Refresh token is required', null));
    }

    // Try to get refresh token from cookies first, then fallback to request body
    const data = await refreshAccessTokenService(refreshToken);

    return res
      .cookie('accessToken', data.accessToken, accessTokenCookieOptions)
      .cookie('refreshToken', data.refreshToken, refreshTokenCookieOptions)
      .status(200)
      .json(new ApiResponse(true, 'Access token refreshed successfully', null));
  }
);
