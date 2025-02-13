import { z } from "zod";
import { sanitize } from "../utils";

export const createCommentSchema = z.object({
  post_id: z.string().uuid({ message: "Invalid post ID" }).transform(sanitize),
  user_id: z.string().uuid({ message: "Invalid user ID" }).transform(sanitize),
  content: z.string().min(1, { message: "Content is required" }).transform(sanitize),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }).transform(sanitize),
});

export const commentParamsSchema = z.object({
  id: z.string().uuid({ message: "Invalid comment ID" }).transform(sanitize),
});

export const getCommentsByPostParamsSchema = z.object({
  post_id: z.string().uuid({ message: "Invalid post ID" }).transform(sanitize),
});

export type CreateCommentSchema = z.infer<typeof createCommentSchema>;
export type UpdateCommentSchema = z.infer<typeof updateCommentSchema>;
export type CommentParamsSchema = z.infer<typeof commentParamsSchema>;
export type GetCommentsByPostsParamsSchema = z.infer<
  typeof getCommentsByPostParamsSchema
>;
