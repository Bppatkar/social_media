import type { Response } from 'express';

import type { AuthRequest } from '../types/auth.types.js';

import asyncHandler from '../utils/asyncHandler.js';

import {
  followUserService,
  unfollowUserService,
  getFollowersService,
  getFollowingService,
} from '../services/follow.service.js';

export const followUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const followingId = req.params.userId as string;
    const followerId = req.user!.userId;

    const result = await followUserService(followerId, followingId);

    res.status(200).json(result);
  }
);

export const unfollowUser = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const followingId = req.params.userId as string;

    const followerId = req.user!.userId;

    const result = await unfollowUserService(followerId, followingId);

    res.status(200).json(result);
  }
);

export const getFollowers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.userId as string;

    const followers = await getFollowersService(userId);

    res.status(200).json(followers);
  }
);

export const getFollowing = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.userId as string;

    const following = await getFollowingService(userId);

    res.status(200).json(following);
  }
);
