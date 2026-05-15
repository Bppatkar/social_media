import { Router } from 'express';
import { authorize } from '../middlewares/authorize.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/dashboard', authMiddleware, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard!' });
});

export default router;
