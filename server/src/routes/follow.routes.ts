import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';

import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from '../controllers/follow.controller.js';
import { getFollowListSchema, userIdParamSchema } from '../validators/follow.validation.js';
import validate from '../middlewares/validate.middleware.js';

const router = Router();

// Protected routes

/**
 * @swagger
 * /api/follows/{userId}:
 *   post:
 *     summary: Follow a user
 *     tags:
 *       - Follows
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
 *         description: User followed successfully
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

router.post(
  '/:userId',
  validate(userIdParamSchema),
  authMiddleware,
  followUser
);

/**
 * @swagger
 * /api/follows/{userId}:
 *   delete:
 *     summary: Unfollow a user
 *     tags:
 *       - Follows
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
 *         description: User unfollowed successfully
 *       400:
 *         description: Invalid user ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

router.delete(
  '/:userId',
  validate(userIdParamSchema),
  authMiddleware,
  unfollowUser
);

/**
 * @swagger
 * /api/follows/followers/{userId}:
 *   get:
 *     summary: Get followers of a user
 *     tags:
 *       - Follows
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a02027f5d3b5622da98f77f
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Records per page
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - latest
 *             - oldest
 *         description: Sort order
 *
 *     responses:
 *       200:
 *         description: Followers retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */


router.get('/followers/:userId', authMiddleware, validate(getFollowListSchema), getFollowers);

/**
 * @swagger
 * /api/follows/following/{userId}:
 *   get:
 *     summary: Get users followed by a user
 *     tags:
 *       - Follows
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6a02027f5d3b5622da98f77f
 *
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Records per page
 *
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum:
 *             - latest
 *             - oldest
 *         description: Sort order
 *
 *     responses:
 *       200:
 *         description: Following list retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

router.get('/following/:userId', authMiddleware, validate(getFollowListSchema), getFollowing);

export default router;
