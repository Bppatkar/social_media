import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { likePost, unlikePost } from '../controllers/like.controller.js';
import { likePostSchema } from '../validators/like.validation.js';
import validate from '../middlewares/validate.middleware.js';

const router = Router();

//! Protected route
router.post('/:postId', validate(likePostSchema), authMiddleware, likePost);
router.delete('/:postId', validate(likePostSchema), authMiddleware, unlikePost);

export default router;
