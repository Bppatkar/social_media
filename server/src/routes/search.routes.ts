import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { searchUsers, suggestedUsers } from '../controllers/search.controller.js';

const router = Router();

router.get('/suggestions', authMiddleware, suggestedUsers);

router.get('/', authMiddleware, searchUsers);

export default router;
