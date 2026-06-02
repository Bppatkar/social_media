import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  createPost,
  deletePost,
  getFeedPosts,
  getSinglePost,
  getUserPosts,
  updatePost,
} from '../controllers/post.controller.js';

import validate from '../middlewares/validate.middleware.js';

import {
  createPostSchema,
  postIdParamSchema,
  updatePostWithParamSchema,
  userIdParamSchema,
} from '../validators/post.validation.js';
import { paginationQuerySchema } from '../validators/common.validation.js';
import upload from '../middlewares/upload.middleware.js';

const router = Router();

//! Protected route
router.post(
  '/create',
  authMiddleware,
  upload.single('image'),
  validate(createPostSchema),
  createPost
);

router.get(
  '/feed',
  validate(paginationQuerySchema),
  authMiddleware,
  getFeedPosts
);

router.get(
  '/user/:userId',
  validate(userIdParamSchema),
  authMiddleware,
  getUserPosts
);

router.get(
  '/:postId',
  validate(postIdParamSchema),
  authMiddleware,
  getSinglePost
);

router.delete(
  '/:postId',
  validate(postIdParamSchema),
  authMiddleware,
  deletePost
);

router.put(
  '/:postId',
  authMiddleware,
  upload.single('image'),
  validate(updatePostWithParamSchema),
  updatePost
);

export default router;
