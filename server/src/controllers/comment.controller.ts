import type { Response } from 'express';

import type { AuthRequest } from '../types/auth.types.js';

import asyncHandler from '../utils/asyncHandler.js';

import {
  addCommentService,
  getPostCommentsService,
  deleteCommentService,
} from '../services/comment.service.js';

export const addComment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;
    const { content } = req.body;
    const userId = req.user!.userId;

    const comment = await addCommentService(postId, userId, content);

    res.status(201).json(comment);
  }
);

export const getPostComments = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;

    const comments = await getPostCommentsService(postId);

    res.status(200).json(comments);
  }
);

export const deleteComment = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const commentId = req.params.commentId as string;

    const userId = req.user!.userId;

    const result = await deleteCommentService(commentId, userId);

    res.status(200).json(result);
  }
);
