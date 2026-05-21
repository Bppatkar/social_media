import type { Request, Response } from 'express';

import asyncHandler from '../utils/asyncHandler.js';
import { getCursorFeedService, getGlobalFeedService } from '../services/feed.service.js';

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

export const getCursorFeed = asyncHandler(
  async (req: Request, res: Response) => {
    const cursor = req.query.cursor as string | undefined;

    const limit = Number(req.query.limit) || 10;

    const data = await getCursorFeedService(cursor, limit);

    res.status(200).json({
      success: true,
      message: ' Cursor Feed fetched successfully',
      data,
    });
  }
);
