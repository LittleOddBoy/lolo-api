import { Request, Response } from "express";
import * as commentService from "../services/comment.service";

export const createCommentController = (req: Request, res: Response) => {
  const { postId, userId, content } = req.body;
  if (!postId || !userId || !content) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const newComment = commentService.createCommentService(
    postId,
    userId,
    content
  );
  res.status(201).json(newComment);
};

export const getCommentsByPostController = (req: Request, res: Response) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(400).json({ error: "post_id parameter is required" });
    return;
  }

  const comments = commentService.getCommentsByPostService(postId);
  res.status(200).json(comments);
};

export const updateCommentController = (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    res.status(400).json({ error: "Missing content" });
    return;
  }

  const updatedComment = commentService.updateCommentService(id, content);
  res.json(updatedComment);
};

export const deleteCommentController = (req: Request, res: Response) => {
  const { id } = req.params;
  commentService.deleteCommentService(id);
  res.json({ message: "Comment deleted" });
};
