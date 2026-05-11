import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { addComment, deleteComment, getPostComments } from '../controllers/comment.controller.js';

const router = Router();

//! Protected route
router.post('/:postId', authMiddleware, addComment);
router.get('/:postId', authMiddleware, getPostComments);
router.delete('/:commentId', authMiddleware, deleteComment);

export default router;
