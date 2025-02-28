import { z } from "zod";
import { sanitize } from "@/utils";

export const createCommentSchema = z
  .object({
    postId: z.string().uuid({ message: "Invalid post ID" }).transform(sanitize),
    userId: z.string().uuid({ message: "Invalid user ID" }).transform(sanitize),
    content: z
      .string()
      .min(1, { message: "Content is required" })
      .max(200, { message: "Comment's content is too long!" })
      .transform(sanitize),
  })
  .required();

export const updateCommentSchema = createCommentSchema
  .pick({ content: true })
  .required();

export const commentParamsSchema = z
  .object({
    id: z.string().uuid({ message: "Invalid comment ID" }).transform(sanitize),
  })
  .required();

export const getCommentsByPostParamsSchema = z
  .object({
    postId: z.string().uuid({ message: "Invalid post ID" }).transform(sanitize),
  })
  .required();

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>;
export type CommentParamsSchema = z.infer<typeof commentParamsSchema>;
export type GetCommentsByPostsParamsSchema = z.infer<
  typeof getCommentsByPostParamsSchema
>;
