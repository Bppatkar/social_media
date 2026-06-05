import { Router } from 'express';
import { authorize } from '../middlewares/authorize.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/admin/dashboard:
 *   get:
 *     summary: Get admin dashboard
 *     tags:
 *       - Admin
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard accessed successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin access required
 */

router.get('/dashboard', authMiddleware, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

export default router;
