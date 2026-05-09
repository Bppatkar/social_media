import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  commentOnPost,
  createPost,
  followUser,
  likePost,
  updateProfile,
} from '../controllers/post.controller.js';

const router = Router();

//! Protected route
router.post('/create-post', authMiddleware, createPost);
router.post('/like-post', authMiddleware, likePost);
router.post('/comment', authMiddleware, commentOnPost);
router.post('/follow', authMiddleware, followUser);
router.put('/update-profile', authMiddleware, updateProfile);

export default router;
