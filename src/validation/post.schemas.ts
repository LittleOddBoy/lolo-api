import { z } from "zod";

export const getPostByIdParamsSchema = z.object({
  id: z.string().uuid(),
});
export const createPostSchema = z.object({
  title: z.string().min(3, "The title must be at least 3 characters long!"),
  content: z
    .string()
    .min(10, "The content must be at least 10 characters long!"),
});
export const updatePostSchema = createPostSchema.partial();
export const updatePostParamsSchema = getPostByIdParamsSchema.partial();
export const deletePostParamsSchema = getPostByIdParamsSchema.partial();

export type GetPostByIdParamsSchema = z.infer<typeof getPostByIdParamsSchema>;
export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
export type UpdatePostParamsSchema = z.infer<typeof updatePostParamsSchema>;
export type DeletePostParamsSchema = z.infer<typeof deletePostParamsSchema>;
