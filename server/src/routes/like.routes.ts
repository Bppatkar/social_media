import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { likePost, unlikePost } from '../controllers/like.controller.js';
import { likePostSchema } from '../validators/like.validation.js';
import validate from '../middlewares/validate.middleware.js';

const router = Router();

//! Protected route
/**
 * @swagger
 * /api/likes/{postId}:
 *   post:
 *     summary: Like a post
 *     tags:
 *       - Likes
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
 *       201:
 *         description: Post liked successfully
 *       400:
 *         description: Invalid post ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

router.post('/:postId', validate(likePostSchema), authMiddleware, likePost);

/**
 * @swagger
 * /api/likes/{postId}:
 *   delete:
 *     summary: Unlike a post
 *     tags:
 *       - Likes
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
 *         description: Post unliked successfully
 *       400:
 *         description: Invalid post ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 */

router.delete('/:postId', validate(likePostSchema), authMiddleware, unlikePost);

export default router;
