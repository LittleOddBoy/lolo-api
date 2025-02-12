import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(3, "The title must be at least 3 characters long!"),
  content: z
    .string()
    .min(10, "The content must be at least 10 characters long!"),
});

export const updatePostSchema = createPostSchema.partial();

export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
