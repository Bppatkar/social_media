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

export const getCommentSchema = z.object({
  params: z.object({
    postId: mongoIdSchema,
  }),

  query: z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    sort: z.enum(['latest', 'oldest']).optional(),
    search: z.string().optional(),
  }),
});
