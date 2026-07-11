import type { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler.js';
import {
  registerUserService,
  loginUserService,
  logoutUserService,
  getUserProfileService,
  refreshAccessTokenService,
  updateUserProfileService,
  getMeService,
  deleteUserAccountService,
} from '../services/auth.service.js';
import ApiResponse from '../utils/ApiResponse.js';

import {
  clearAuthCookies,
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from '../utils/authCookies.js';
import { uploadSingleImageService } from '../services/media.service.js';
import { COOKIE_NAMES } from '../constants/auth.constants.js';
import { logAuditEvent } from '../utils/logger.util.js';

export const deleteAccount = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteUserAccountService(req.user!.userId);

    clearAuthCookies(res);

    logAuditEvent('User Account Deleted', {
      userId: req.user?.userId,
    });

    res
      .status(200)
      .json(new ApiResponse(true, 'Account deleted successfully', null));
  }
);

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const data = await registerUserService(username, email, password);

  setAccessTokenCookie(res, data.accessToken);
  setRefreshTokenCookie(res, data.refreshToken);

  logAuditEvent('User Registered', {
    userId: data.user._id.toString(),
    email: data.user.email,
  });

  res.status(201).json(
    new ApiResponse(true, 'User registered successfully', {
      user: data.user,
    })
  );
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await loginUserService(email, password);

  setAccessTokenCookie(res, data.accessToken);
  setRefreshTokenCookie(res, data.refreshToken);

  logAuditEvent('User Login', {
    userId: data.user._id.toString(),
    email: data.user.email,
  });

  res.status(200).json(
    new ApiResponse(true, 'user logged in successfully', {
      user: data.user,
    })
  );
  // now browser stores tokens in cookies and send them automatically with every request,  so response should mainly contain user data and success message, no need to send tokens in response body
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies[COOKIE_NAMES.REFRESH_TOKEN];
  await logoutUserService(refreshToken);

  logAuditEvent('User Logout', {
    userId: req.user?.userId,
  });
  clearAuthCookies(res);

  res.status(200).json(new ApiResponse(true, 'Logged out successfully', null));
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await getMeService(req.user!.userId);
  res
    .status(200)
    .json(new ApiResponse(true, 'User retrieved successfully', user));
});

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    const currentUserId = (req as Request & { user?: { userId: string } }).user!
      .userId;
    const user = await getUserProfileService(userId, currentUserId);
    res
      .status(200)
      .json(new ApiResponse(true, 'User profile retrieved successfully', user));
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken = req.cookies[COOKIE_NAMES.REFRESH_TOKEN];

    // Try to get refresh token from cookies first, then fallback to request body
    const data = await refreshAccessTokenService(refreshToken);

    // rotate refresh token - generate new one and invalidate old one in DB
    setRefreshTokenCookie(res, data.refreshToken);
    setAccessTokenCookie(res, data.accessToken);

    return res
      .status(200)
      .json(new ApiResponse(true, 'Access token refreshed successfully', null));
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    const { username, email, bio } = req.body;
    const files = req.files as
      | {
          profileImage?: Express.Multer.File[];
          coverImage?: Express.Multer.File[];
        }
      | undefined;

    let profileImageUrl: string | undefined;
    let profileImagePublicId: string | undefined;
    let coverImageUrl: string | undefined;
    let coverImagePublicId: string | undefined;

    const profileImageFile = files?.profileImage?.[0];
    const coverImageFile = files?.coverImage?.[0];

    if (profileImageFile) {
      const uploadImage = await uploadSingleImageService(
        profileImageFile.buffer,
        'avatars'
      );

      profileImageUrl = uploadImage.imageUrl;
      profileImagePublicId = uploadImage.imagePublicId;
    }

    if (coverImageFile) {
      const uploadImage = await uploadSingleImageService(
        coverImageFile.buffer,
        'covers'
      );

      coverImageUrl = uploadImage.imageUrl;
      coverImagePublicId = uploadImage.imagePublicId;
    }

    const updateData: {
      username?: string;
      email?: string;
      bio?: string;
      profileImage?: string;
      profileImagePublicId?: string;
      coverImage?: string;
      coverImagePublicId?: string;
    } = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (bio) updateData.bio = bio;

    if (profileImageUrl && profileImagePublicId) {
      updateData.profileImage = profileImageUrl;
      updateData.profileImagePublicId = profileImagePublicId;
    }

    if (coverImageUrl && coverImagePublicId) {
      updateData.coverImage = coverImageUrl;
      updateData.coverImagePublicId = coverImagePublicId;
    }

    const updateUser = await updateUserProfileService(
      req.user!.userId,
      updateData
    );

    logAuditEvent('Profile Updated', {
      userId: req.user?.userId,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updateUser,
    });
  }
);
