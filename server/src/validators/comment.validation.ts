import { z } from 'zod';
import { mongoIdSchema } from './common.validation.js';

export const commentIdParamSchema = z.object({
  params: z.object({
    commentId: mongoIdSchema,
  }),
});

export const addCommentSchema = z.object({
  body: z.object({
    content: z
      .string()
      .trim()
      .min(1, 'Comment content is required')
      .max(300, 'Comment content must be less than 300 characters'),
  }),
});

export const addCommentWithPostSchema = z.object({
  params: z.object({
    postId: mongoIdSchema,
  }),

  body: z.object({
    content: z
      .string()
      .trim()
      .min(1, 'Comment content is required')
      .max(300, 'Comment content must be less than 300 characters'),
  }),
});

export const updateCommentSchema = z.object({
  params: z.object({
    commentId: mongoIdSchema,
  }),
  body: z.object({
    content: z
      .string()
      .trim()
      .min(1, 'Comment content is required')
      .max(300, 'Comment content must be less than 300 characters'),
  }),
});
