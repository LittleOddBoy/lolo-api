import { z } from "zod";

export const createCommentSchema = z.object({
  post_id: z.string().uuid({ message: "Invalid post ID" }),
  user_id: z.string().uuid({ message: "Invalid user ID" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),
});

export const commentParamsSchema = z.object({
  id: z.string().uuid({ message: "Invalid comment ID" }),
});

export const getCommentsByPostParamsSchema = z.object({
  post_id: z.string().uuid({ message: "Invalid post ID" }),
});
