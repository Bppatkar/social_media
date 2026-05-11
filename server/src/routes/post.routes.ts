import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  createPost,
  deletePost,
  getFeedPosts,
  getSinglePost,
  updatePost,
} from '../controllers/post.controller.js';

const router = Router();

//! Protected route
router.post('/create', authMiddleware, createPost);
router.get('/feed', authMiddleware, getFeedPosts);
router.get('/:postId', authMiddleware, getSinglePost);
router.delete('/:postId', authMiddleware, deletePost);
router.put('/:postId', authMiddleware, updatePost);

export default router;
