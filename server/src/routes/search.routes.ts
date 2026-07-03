import { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware.js';
import { searchUsers } from '../controllers/search.controller.js';

const router = Router();

router.get('/', authMiddleware, searchUsers);

export default router;
