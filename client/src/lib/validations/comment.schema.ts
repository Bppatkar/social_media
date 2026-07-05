import { z } from 'zod';

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, 'Comment is required.')
    .max(300, 'Comment cannot exceed 300 characters.'),
});

export type CommentSchema = z.infer<typeof commentSchema>;
