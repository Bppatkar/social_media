import { z } from 'zod';

/* export const mongoIdSchema = z.string().regex(
  /^[0-9a-fA-F]{24}$/,
  'Invalid MongoDB ObjectId'
);

export const paginationQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),

    limit: z.string().optional(),

    sort: z.enum(['latest', 'oldest']).optional(),

    search: z.string().optional(),
  }),
}); */

/* 
//* Currently:
page: z.string().optional()

means:
"abc" also valid

BAD. We should validate numbers properly.
*/
//! we use coerce to convert string to number before validation

export const mongoIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');

export const paginationQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(), // coerce means - if it's a string, try to convert to number before validation

    limit: z.coerce.number().min(1).max(100).optional(),

    sort: z.enum(['latest', 'oldest']).optional(),

    search: z.string().optional(),
  }),
});
