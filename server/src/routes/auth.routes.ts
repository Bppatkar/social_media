import { Router } from 'express';
import {
  getMe,
  getUserProfile,
  login,
  logout,
  deleteAccount,
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
import upload from '../middlewares/upload.middleware.js';
import { authLimiter } from '../middlewares/rateLimit.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: bhanu
 *               email:
 *                 type: string
 *                 example: bhanu@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request - validation errors
 *       409:
 *         description: Conflict - email already in use
 *
 */

router.post('/register', validate(registerSchema), register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: bhanu@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Bad request - validation errors
 *       401:
 *         description: Unauthorized - invalid credentials
 */

router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  auditMiddleware({ action: 'LOGIN_ATTEMPT' }),
  login
);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh access token
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: Unauthorized
 */

router.post('/refresh', refreshAccessToken);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current logged in user
 *     tags:
 *       - Auth
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: Unauthorized
 */

router.get('/me', authMiddleware, getMe);

/**
 * @swagger
 * /api/auth/{userId}:
 *   get:
 *     summary: Get user profile by ID
 *     tags:
 *       - Auth
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         example: 6850bdbcf1c3ab1234567890
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User profile retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 6a02027f5d3b5622da98f77f
 *                     username:
 *                       type: string
 *                       example: bhanu_swagger
 *                     email:
 *                       type: string
 *                       example: bhanu@gmail.com
 *                     bio:
 *                       type: string
 *                       example: MERN Stack Developer with dsa
 *                     profileImage:
 *                       type: string
 *                       example: https://res.cloudinary.com/...
 *                     role:
 *                       type: string
 *                       example: admin
 *       400:
 *         description: Bad request - validation errors
 *       401:
 *         description: Unauthorized - invalid credentials
 */

router.get(
  '/:userId',
  authMiddleware,
  validate(userIdParamSchema),
  getUserProfile
);

/**
 * @swagger
 * /api/auth/update-profile:
 *   patch:
 *     summary: Update logged in user's profile
 *     tags:
 *       - Auth
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: bhanu_updated
 *               bio:
 *                 type: string
 *                 example: MERN Stack Developer
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch(
  '/update-profile',
  authMiddleware,
  upload.fields([
    { name: 'profileImage', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  validate(updateProfileSchema),
  updateProfile
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout current user
 *     tags:
 *       - Auth
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 */
router.post('/logout', authMiddleware, logout);

router.delete('/me', authMiddleware, deleteAccount);

export default router;
