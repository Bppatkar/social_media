import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import {
  addComment,
  deleteComment,
  getPostComments,
} from '../controllers/comment.controller.js';

import validate from '../middlewares/validate.middleware.js';

import {
  addCommentWithPostSchema,
  commentIdParamSchema,
} from '../validators/comment.validation.js';
import { postIdParamSchema } from '../validators/post.validation.js';

const router = Router();

//! Protected route
router.post(
  '/:postId',
  validate(addCommentWithPostSchema),
  authMiddleware,
  addComment
);
router.get(
  '/:postId',
  validate(postIdParamSchema),
  authMiddleware,
  getPostComments
);

router.delete(
  '/:commentId',
  validate(commentIdParamSchema),
  authMiddleware,
  deleteComment
);

export default router;
