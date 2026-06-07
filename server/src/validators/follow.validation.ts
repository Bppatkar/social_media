import { z } from 'zod';
import { mongoIdSchema } from './common.validation.js';

export const userIdParamSchema = z.object({
  params: z.object({
    userId: mongoIdSchema,
  }),
});

export const getFollowListSchema = z.object({
  params: z.object({
    userId: mongoIdSchema,
  }),

  query: z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    sort: z.enum(['latest', 'oldest']).optional(),
  }),
});