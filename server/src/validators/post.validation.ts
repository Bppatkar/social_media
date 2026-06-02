import { z } from 'zod';
import { mongoIdSchema } from './common.validation.js';

export const postIdParamSchema = z.object({
  params: z.object({
    postId: mongoIdSchema,
  }),
});

export const createPostSchema = z.object({
  body: z.object({
    content: z
      .string()
      .trim()
      .min(1, 'Content is required')
      .max(500, 'Content too long'),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    content: z.string().trim().max(500).optional(),
  }),
});

export const updatePostWithParamSchema = z.object({
  params: z.object({
    postId: mongoIdSchema,
  }),

  body: z.object({
    content: z.string().trim().max(500).optional(),
  }),
});

export const userIdParamSchema = z.object({
  params: z.object({
    userId: mongoIdSchema,
  }),
});