import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { deleteAccount } from '../controllers/auth.controller.js';

const router = Router();

router.delete('/me', authMiddleware, deleteAccount);

export default router;
