
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



import { z } from 'zod';
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

export const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email('Invalid email address');

export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters long')
  .max(50, 'Password too long');

export const usernameSchema = z
  .string()
  .trim()
  .min(3, 'Username must be at least 3 characters long')
  .max(20, 'Username too long');
