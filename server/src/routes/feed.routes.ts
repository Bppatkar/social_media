import { Router } from 'express';

import { getGlobalFeed } from '../controllers/feed.controller.js';

const router = Router();
router.get('/', getGlobalFeed);

export default router;
