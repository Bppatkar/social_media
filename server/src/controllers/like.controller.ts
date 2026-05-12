import type { Response } from 'express';
import type { AuthRequest } from '../types/auth.types.js';
import asyncHandler from '../utils/asyncHandler.js';
import { likePostService, unlikePostService } from '../services/like.service.js';

export const likePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;

    const userId = req.user!.userId;

    const result = await likePostService(postId, userId);

    res.status(200).json(result);
  }
);

export const unlikePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;

    const userId = req.user!.userId;

    const result = await unlikePostService(postId, userId);

    res.status(200).json(result);
  }
);
