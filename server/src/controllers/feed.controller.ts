import type { Request, Response } from 'express';

import asyncHandler from '../utils/asyncHandler.js';
import { getGlobalFeedService } from '../services/feed.service.js';

export const getGlobalFeed = asyncHandler(
  async (_req: Request, res: Response) => {
    const posts = await getGlobalFeedService();

    res.status(200).json({
      success: true,
      message: 'Feed retrieved successfully',
      data: posts,
    });
  }
);
