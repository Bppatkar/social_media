import type { Response } from 'express';

import type { AuthRequest } from '../types/auth.types.js';

import asyncHandler from '../utils/asyncHandler.js';

import {
  followUserService,
  unfollowUserService,
  getFollowersService,
  getFollowingService,
} from '../services/follow.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import getPagination from '../utils/pagination.js';

export const followUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const followingId = req.params.userId as string;
    const followerId = req.user!.userId;

    const result = await followUserService(followerId, followingId);

    res
      .status(200)
      .json(new ApiResponse(true, 'User followed successfully', result));
  }
);

export const unfollowUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const followingId = req.params.userId as string;

    const followerId = req.user!.userId;

    const result = await unfollowUserService(followerId, followingId);

    res
      .status(200)
      .json(new ApiResponse(true, 'User unfollowed successfully', result));
  }
);

export const getFollowers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.userId as string;

    const { page, limit, skip } = getPagination(req.query);
    const sort = (req.query.sort as string) || 'latest';

    const followers = await getFollowersService(
      userId,
      page,
      limit,
      skip,
      sort
    );

    res
      .status(200)
      .json(
        new ApiResponse(true, 'Followers retrieved successfully', followers)
      );
  }
);

export const getFollowing = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.userId as string;
    const { page, limit, skip } = getPagination(req.query);
    const sort = (req.query.sort as string) || 'latest';

    const following = await getFollowingService(userId, page, limit, skip, sort);

    res
      .status(200)
      .json(
        new ApiResponse(true, 'Following retrieved successfully', following)
      );
  }
);
