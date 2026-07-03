import type { Response } from 'express';
import type { AuthRequest } from '../types/auth.types.js';

import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import getPagination from '../utils/pagination.js';
import { searchUsersService } from '../services/search.service.js';

export const searchUsers = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { page, limit, skip } = getPagination(req.query);

    const search = (req.query.q as string) || '';

    const users = await searchUsersService(
      req.user!.userId,
      search,
      page,
      limit,
      skip
    );

    res
      .status(200)
      .json(new ApiResponse(true, 'Users fetched successfully', users));
  }
);