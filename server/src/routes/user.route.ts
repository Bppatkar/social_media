import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

/* 
public routes:
register
login

protected routes:
create post
like post
comment
follow
profile update
 */

//! Public routes
router.post('/register', register);
router.post('/login', login);

//! Protected routes
// router.post('/create-post', authMiddleware, createPost);
// router.post('/like-post', authMiddleware, likePost);
// router.post('/comment', authMiddleware, commentOnPost);
// router.post('/follow', authMiddleware, followUser);
// router.put('/update-profile', authMiddleware, updateProfile);

export default router;
