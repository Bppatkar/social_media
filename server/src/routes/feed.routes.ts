import { Router } from 'express';

import { getCursorFeed, getGlobalFeed } from '../controllers/feed.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { cursorPaginationSchema } from '../validators/feed.validation.js';

const router = Router();
router.get('/', getGlobalFeed);
router.get('/cursor', validate(cursorPaginationSchema), getCursorFeed);

export default router;
