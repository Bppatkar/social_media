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
/**
 * @swagger
 * /api/posts/create:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: My first post
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */

router.post(
  '/create',
  authMiddleware,
  upload.single('image'),
  validate(createPostSchema),
  createPost
);

/**
 * @swagger
 * /api/posts/feed:
 *   get:
 *     summary: Get feed posts
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Feed retrieved successfully
 *       401:
 *         description: Unauthorized
 */

router.get(
  '/feed',
  validate(paginationQuerySchema),
  authMiddleware,
  getFeedPosts
);

/**
 * @swagger
 * /api/posts/user/{userId}:
 *   get:
 *     summary: Get posts of a specific user
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a02027f5d3b5622da98f77f
 *     responses:
 *       200:
 *         description: User posts retrieved successfully
 *       404:
 *         description: User not found
 */

router.get(
  '/user/:userId',
  validate(userIdParamSchema),
  authMiddleware,
  getUserPosts
);

/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     summary: Get single post
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         example: 686123456789abcdef123456
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 */

router.get(
  '/:postId',
  validate(postIdParamSchema),
  authMiddleware,
  getSinglePost
);

/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: Delete a post
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         example: 686123456789abcdef123456
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       401:
 *         description: Unauthorized
 */

router.delete(
  '/:postId',
  validate(postIdParamSchema),
  authMiddleware,
  deletePost
);

/**
 * @swagger
 * /api/posts/{postId}:
 *   put:
 *     summary: Update a post
 *     tags:
 *       - Posts
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         example: 686123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated post content
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

router.put(
  '/:postId',
  authMiddleware,
  upload.single('image'),
  validate(updatePostWithParamSchema),
  updatePost
);

export default router;
