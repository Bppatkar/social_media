import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { likePost, unlikePost } from '../controllers/like.controller.js';

const router = Router();

//! Protected route
router.post('/:postId', authMiddleware, likePost);
router.delete('/:postId', authMiddleware, unlikePost);

export default router;
