import { email, z } from 'zod';
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
} from './common.validation.js';

export const registerSchema = z.object({
  body: z
    .object({
      username: usernameSchema,

      email: emailSchema,

      password: passwordSchema,
    })
    .strict(),
});

export const loginSchema = z.object({
  body: z
    .object({
      email: emailSchema,

      password: passwordSchema,
    })
    .strict(),
});

export const updateProfileSchema = z.object({
  body: z
    .object({
      username: usernameSchema.optional(),
      email: emailSchema,
    })
    .strict(),
});
