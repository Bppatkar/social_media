import { z } from 'zod';

export const cursorPaginationSchema = z.object({
  query: z.object({
    cursor: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, 'Invalid Cursor Id')
      .optional(),
    limit: z.coerce.number().min(1).max(50).optional(),
  }),
});
