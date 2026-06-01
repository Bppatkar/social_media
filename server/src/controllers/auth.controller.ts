import type { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import {
  registerUserService,
  loginUserService,
  logoutUserService,
  getUserProfileService,
  refreshAccessTokenService,
  updateUserProfileService,
} from '../services/auth.service.js';
import ApiResponse from '../utils/ApiResponse.js';

import {
  clearAuthCookies,
  setRefreshTokenCookie,
} from '../utils/authCookies.js';
import { uploadSingleImageService } from '../services/media.service.js';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const data = await registerUserService(username, email, password);

  setRefreshTokenCookie(res, data.refreshToken);

  res.status(201).json(
    new ApiResponse(true, 'User registered successfully', {
      user: data.user,
      accessToken: data.accessToken,
    })
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUserService(email, password);

  setRefreshTokenCookie(res, data.refreshToken);
  res.status(200).json(
    new ApiResponse(true, 'user logged in successfully', {
      user: data.user,
      accessToken: data.accessToken,
    })
  );
  // now browser stores tokens in cookies and send them automatically with every request,  so response should mainly contain user data and success message, no need to send tokens in response body
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  await logoutUserService(refreshToken);

  clearAuthCookies(res);

  res.status(200).json(new ApiResponse(true, 'Logged out successfully', null));
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user!;
  res
    .status(200)
    .json(new ApiResponse(true, 'User retrieved successfully', user));
});

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
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

    // Try to get refresh token from cookies first, then fallback to request body
    const data = await refreshAccessTokenService(refreshToken);

    // rotate refresh token - generate new one and invalidate old one in DB
    setRefreshTokenCookie(res, data.refreshToken);

    return res.status(200).json(
      new ApiResponse(true, 'Access token refreshed successfully', {
        accessToken: data.accessToken,
      })
    );
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, bio } = req.body;
    const file = req.file;

    let profileImageUrl: string | undefined;
    let profileImagePublicId: string | undefined;

    if (file) {
      const uploadImage = await uploadSingleImageService(
        file.buffer,
        'avatars'
      );

      profileImageUrl = uploadImage.imageUrl;
      profileImagePublicId = uploadImage.imagePublicId;
    }

    const updateData: {
      username?: string;
      email?: string;
      bio?: string;
      profileImage?: string;
      profileImagePublicId?: string;
    } = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (bio) updateData.bio = bio;

    if (profileImageUrl && profileImagePublicId) {
      updateData.profileImage = profileImageUrl;
      updateData.profileImagePublicId = profileImagePublicId;
    }

    const updateUser = await updateUserProfileService(
      req.user!.userId,
      updateData
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updateUser,
    });
  }
);
