import { Router } from 'express';

import { getCursorFeed, getGlobalFeed } from '../controllers/feed.controller.js';
import validate from '../middlewares/validate.middleware.js';
import { cursorPaginationSchema } from '../validators/feed.validation.js';

const router = Router();

/**
 * @swagger
 * /api/feed:
 *   get:
 *     summary: Get global feed
 *     tags:
 *       - Feed
 *     responses:
 *       200:
 *         description: Global feed retrieved successfully
 */

router.get('/', getGlobalFeed);

/**
 * @swagger
 * /api/feed/cursor:
 *   get:
 *     summary: Get cursor paginated feed
 *     tags:
 *       - Feed
 *     parameters:
 *       - in: query
 *         name: cursor
 *         schema:
 *           type: string
 *         example: 6850bdbcf1c3ab1234567890
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 10
 *     responses:
 *       200:
 *         description: Cursor feed retrieved successfully
 *       400:
 *         description: Invalid query parameters
 */

router.get('/cursor', validate(cursorPaginationSchema), getCursorFeed);

export default router;
