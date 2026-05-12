import { z } from 'zod';
import { mongoIdSchema } from './common.validation.js';

export const likePostSchema = z.object({
  params: z.object({
    postId: mongoIdSchema,
  }),
});
