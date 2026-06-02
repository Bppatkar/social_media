import { z } from 'zod';
import { mongoIdSchema } from './common.validation.js';

export const userIdParamSchema = z.object({
  params: z.object({
    userId: mongoIdSchema,
  }),
});

