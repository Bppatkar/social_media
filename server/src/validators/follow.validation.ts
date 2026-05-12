import { z } from 'zod';
import { mongoIdSchema } from './common.validation.js';

export const userIdParamSchema = z.object({
  params: z.object({
    userId: mongoIdSchema,
  }),
});

export const followSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User id is required'),
  }),
});
