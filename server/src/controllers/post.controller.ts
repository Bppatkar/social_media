import type { Response } from 'express';
import type { AuthRequest } from '../types/auth.types.js';
import asyncHandler from '../utils/asyncHandler.js';
import getPagination from '../utils/pagination.js';

import {
  createPostService,
  getFeedPostsService,
  getSinglePostService,
  deletePostService,
  updatePostService,
} from '../services/post.service.js';

export const createPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { content, image } = req.body;
    const ownerId = req.user!.userId;

    const post = await createPostService(content, image, ownerId);
    res.status(201).json(post);
  }
);

export const getFeedPosts = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { page, limit, skip } = getPagination(req.query);

    const search = (req.query.search as string) || '';
    const sort = (req.query.sort as string) || 'latest';

    const posts = await getFeedPostsService(page, limit, search, sort, skip);
    res.status(200).json(posts);
  }
);

export const getSinglePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;
    const post = await getSinglePostService(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  }
);

export const deletePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;
    const userId = req.user!.userId;
    const result = await deletePostService(postId, userId);
    if (!result) {
      return res
        .status(404)
        .json({ message: 'Post not found or unauthorized' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  }
);

export const updatePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;
    const { content, image } = req.body;

    const userId = req.user!.userId;

    const updatedPost = await updatePostService(postId, userId, content, image);

    res.status(200).json(updatedPost);
  }
);
