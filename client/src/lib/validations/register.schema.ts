import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(3).max(30),

    email: z.email(),

    password: z.string().min(6),

    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
