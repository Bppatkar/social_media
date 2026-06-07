import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  addComment,
  deleteComment,
  getPostComments,
  updateComment,
} from '../controllers/comment.controller.js';

import validate from '../middlewares/validate.middleware.js';

import {
  addCommentWithPostSchema,
  commentIdParamSchema,
  getCommentSchema,
  updateCommentSchema,
} from '../validators/comment.validation.js';
import { postIdParamSchema } from '../validators/post.validation.js';

const router = Router();

//! Protected route
/**
 * @swagger
 * /api/comments/{postId}:
 *   post:
 *     summary: Add comment to a post
 *     tags:
 *       - Comments
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
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Nice post!
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

router.post(
  '/:postId',
  validate(addCommentWithPostSchema),
  authMiddleware,
  addComment
);

/**
 * @swagger
 * /api/comments/{postId}:
 *   get:
 *     summary: Get all comments of a post
 *     tags:
 *       - Comments
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         example: 686123456789abcdef123456
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - latest
 *             - oldest
 *         example: latest
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: nice
 *
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

router.get(
  '/:postId',
  validate(getCommentSchema),
  authMiddleware,
  getPostComments
);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags:
 *       - Comments
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         example: 686123456789abcdef123456
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */


router.delete(
  '/:commentId',
  validate(commentIdParamSchema),
  authMiddleware,
  deleteComment
);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   patch:
 *     summary: Update a comment
 *     tags:
 *       - Comments
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         example: 686123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 example: Updated comment text
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Comment not found
 */

router.patch(
  '/:commentId',
  validate(updateCommentSchema),
  authMiddleware,
  updateComment
);

export default router;
