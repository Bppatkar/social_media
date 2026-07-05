import { z } from 'zod';

export const profileSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username must be at least 3 characters.')
    .max(30, 'Username cannot exceed 30 characters.'),

  bio: z.string().max(200, 'Bio cannot exceed 200 characters.').optional(),

  profileImage: z.instanceof(File).optional().or(z.undefined()),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
