import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';

import {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
} from '../controllers/follow.controller.js';
import { userIdParamSchema } from '../validators/follow.validation.js';
import validate from '../middlewares/validate.middleware.js';

const router = Router();

// Protected routes
router.post(
  '/:userId',
  validate(userIdParamSchema),
  authMiddleware,
  followUser
);

router.delete(
  '/:userId',
  validate(userIdParamSchema),
  authMiddleware,
  unfollowUser
);
router.get('/followers/:userId', authMiddleware, validate(userIdParamSchema), getFollowers);
router.get('/following/:userId', authMiddleware, validate(userIdParamSchema), getFollowing);

export default router;
