import type { Response } from 'express';

import type { AuthRequest } from '../types/auth.types.js';

import asyncHandler from '../utils/asyncHandler.js';

import {
  addCommentService,
  getPostCommentsService,
  deleteCommentService,
} from '../services/comment.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import getPagination from '../utils/pagination.js';

export const addComment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;
    const { content } = req.body;
    const userId = req.user!.userId;

    const comment = await addCommentService(postId, userId, content);

    res
      .status(201)
      .json(new ApiResponse(true, 'Comment added successfully', comment));
  }
);

export const getPostComments = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;

    const {page, limit, skip} = getPagination(req.query);

    const search = (req.query.search as string) || '';
    const sort = (req.query.sort as string) || 'latest';

    const comments = await getPostCommentsService(postId, page, limit, skip, search, sort);

    res.status(200).json(new ApiResponse(true, 'Comments retrieved successfully', comments));
  }
);

export const deleteComment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const commentId = req.params.commentId as string;

    const userId = req.user!.userId;

    const result = await deleteCommentService(commentId, userId);

    res.status(200).json(new ApiResponse(true, 'Comment deleted successfully', result));
  }
);
