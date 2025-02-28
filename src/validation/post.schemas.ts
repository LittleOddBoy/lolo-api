import { z } from "zod";
import { sanitize } from "../utils";

export const getPostByIdParamsSchema = z.object({
  id: z.string().uuid(),
}).required();
export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "The title must be at least 3 characters long!")
    .transform(sanitize),
  content: z
    .string()
    .min(10, "The content must be at least 10 characters long!")
    .transform(sanitize),
  userId: z.string().uuid()
}).required();
export const updatePostSchema = createPostSchema.partial({ userId: true });
export const updatePostParamsSchema = getPostByIdParamsSchema.partial();
export const deletePostParamsSchema = getPostByIdParamsSchema.partial();
export const searchPostQuerySchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "Query must not be empty")
    .max(50, "Query is too long")
    .regex(
      /^[a-zA-Z0-9.,\-_();\s]+$/,
      "Query can only contain letters, numbers, and spaces"
    )
    .refine(
      (q) =>
        !/\b(SELECT|INSERT|UPDATE|DELETE|DROP|TRUNCATE|ALTER|EXEC|UNION|OR|AND)\b/i.test(
          q
        ),
      "Potentially dangerous query detected"
    )
    .transform(sanitize),
}).required();

export type GetPostByIdParamsSchema = z.infer<typeof getPostByIdParamsSchema>;
export type CreatePostSchema = z.infer<typeof createPostSchema>;
export type UpdatePostSchema = z.infer<typeof updatePostSchema>;
export type UpdatePostParamsSchema = z.infer<typeof updatePostParamsSchema>;
export type DeletePostParamsSchema = z.infer<typeof deletePostParamsSchema>;
export type SearchPostQuerySchema = z.infer<typeof searchPostQuerySchema>;
