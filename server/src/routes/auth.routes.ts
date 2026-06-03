import { Router } from 'express';
import {
  getMe,
  getUserProfile,
  login,
  logout,
  refreshAccessToken,
  register,
  updateProfile,
} from '../controllers/auth.controller.js';
import validate from '../middlewares/validate.middleware.js';
import {
  loginSchema,
  registerSchema,
  updateProfileSchema,
} from '../validators/auth.validation.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { userIdParamSchema } from '../validators/follow.validation.js';
import auditMiddleware from '../middlewares/audit.middleware.js';
import upload from "../middlewares/upload.middleware.js"
import { authLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  auditMiddleware({ action: 'LOGIN_ATTEMPT' }),
  login
);
router.post('/refresh', refreshAccessToken);
router.get('/me', authMiddleware, getMe);
router.get(
  '/:userId',
  authMiddleware,
  validate(userIdParamSchema),
  getUserProfile
);
router.patch(
  '/update-profile',
  authMiddleware,
  upload.single('profileImage'),
  validate(updateProfileSchema),
  updateProfile
);
router.post('/logout', authMiddleware, logout);

export default router;
