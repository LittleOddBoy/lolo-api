import { Request, Response } from "express";
import * as commentService from "../services/comment.service";

export const createCommentController = async (req: Request, res: Response) => {
  const { postId, userId, content } = req.body;
  if (!postId || !userId || !content) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const newComment = await commentService.createCommentService(
    postId,
    userId,
    content
  );
  res.status(201).json(newComment);
};

export const getCommentsByPostController = async (
  req: Request,
  res: Response
) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(400).json({ error: "post_id parameter is required" });
    return;
  }

  const comments = await commentService.getCommentsByPostService(postId);
  res.status(200).json(comments);
};

export const updateCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    res.status(400).json({ error: "Missing content" });
    return;
  }

  const updatedComment = await commentService.updateCommentService(id, content);
  res.json(updatedComment);
};

export const deleteCommentController = async (req: Request, res: Response) => {
  const { id } = req.params;
  await commentService.deleteCommentService(id);
  res.json({ message: "Comment deleted" });
};
