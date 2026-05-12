import { z } from 'zod';
import { mongoIdSchema } from './common.validation.js';

export const postIdParamSchema = z.object({
  params: z.object({
    postId: mongoIdSchema,
  }),
});

export const createPostSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Content is required'),

    image: z.string().optional(),
  }),
});

export const updatePostSchema = z.object({
  body: z.object({
    content: z.string().optional(),

    image: z.string().optional(),
  }),
});

export const updatePostWithParamSchema = z.object({
  params: z.object({
    postId: mongoIdSchema,
  }),

  body: z.object({
    content: z.string().optional(),

    image: z.string().optional(),
  }),
});