import { Router } from 'express';
import {
  getMe,
  getUserProfile,
  login,
  logout,
  register,
} from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '../validators/auth.validation.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { userIdParamSchema } from '../validators/follow.validation.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', authMiddleware, getMe);
router.get('/:userId', authMiddleware, validate(userIdParamSchema), getUserProfile);
router.post('/logout', authMiddleware, logout);

export default router;
