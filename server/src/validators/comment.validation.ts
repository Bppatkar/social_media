import { z } from 'zod';
import { mongoIdSchema } from './common.validation.js';

export const commentIdParamSchema = z.object({
  params: z.object({
    commentId: mongoIdSchema,
  }),
});

export const addCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Comment content is required'),
  }),
});

export const addCommentWithPostSchema = z.object({
  params: z.object({
    postId: mongoIdSchema,
  }),

  body: z.object({
    content: z.string().min(1, 'Comment content is required'),
  }),
});
