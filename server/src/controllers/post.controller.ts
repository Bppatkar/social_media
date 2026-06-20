import type { Response } from 'express';
import type { AuthRequest } from '../types/auth.types.js';
import asyncHandler from '../utils/asyncHandler.js';
import getPagination from '../utils/pagination.js';
import { logAuditEvent } from '../utils/logger.util.js';

import {
  createPostService,
  getFeedPostsService,
  getSinglePostService,
  deletePostService,
  updatePostService,
  getUserPostsService,
} from '../services/post.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import { uploadSingleImageService } from '../services/media.service.js';

export const createPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { content } = req.body;
    const file = req.file;

    // console.log('Received file:', file);
    // console.log('Received Body:', req.body);

    let imageUrl = '';
    let imagePublicId = '';

    if (file) {
      const uploadedImage = await uploadSingleImageService(
        file.buffer,
        'posts'
      );
      imageUrl = uploadedImage.imageUrl;
      imagePublicId = uploadedImage.imagePublicId;
    }

    const ownerId = req.user!.userId;

    const post = await createPostService(
      content,
      imageUrl,
      imagePublicId,
      ownerId
    );

    logAuditEvent('Post Created', {
      userId: req.user?.userId,
      postId: post._id.toString(),
    });

    res
      .status(201)
      .json(new ApiResponse(true, 'Post created successfully', post));
  }
);

export const getFeedPosts = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { page, limit, skip } = getPagination(req.query);

    const search = (req.query.search as string) || '';
    const sort = (req.query.sort as string) || 'latest';

    const posts = await getFeedPostsService(page, limit, search, sort, skip);
    res
      .status(200)
      .json(new ApiResponse(true, 'Posts fetched successfully', posts));
  }
);

export const getSinglePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;
    const post = await getSinglePostService(postId);

    res
      .status(200)
      .json(new ApiResponse(true, 'Post fetched successfully', post));
  }
);

export const deletePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;
    const userId = req.user!.userId;
    await deletePostService(postId, userId);

    logAuditEvent('Post Deleted', {
      userId: req.user?.userId,
      postId: postId,
    });

    res
      .status(200)
      .json(new ApiResponse(true, 'Post deleted successfully', null));
  }
);

export const updatePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const postId = req.params.postId as string;
    const { content } = req.body;

    const file = req.file;

    const userId = req.user!.userId;

    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (file) {
      const uploadedImage = await uploadSingleImageService(
        file.buffer,
        'posts'
      );
      imageUrl = uploadedImage.imageUrl;
      imagePublicId = uploadedImage.imagePublicId;
    }

    const updatedPost = await updatePostService(
      postId,
      userId,
      content,
      imageUrl,
      imagePublicId
    );

    logAuditEvent('Post Updated', {
      userId: req.user?.userId,
      postId,
    });

    res
      .status(200)
      .json(new ApiResponse(true, 'Post updated successfully', updatedPost));
  }
);

export const getUserPosts = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.userId as string;
    const { page, limit, skip } = getPagination(req.query);
    const posts = await getUserPostsService(userId, page, limit, skip);

    res
      .status(200)
      .json(new ApiResponse(true, 'User posts fetched successfully', posts));
  }
);
