import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';

import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
} from '../controllers/notification.controller.js';

const router = Router();

router.get('/unread-count', authMiddleware, getUnreadCount);
router.get('/', authMiddleware, getNotifications);
router.patch('/:id/read', authMiddleware, markNotificationAsRead);

export default router;
