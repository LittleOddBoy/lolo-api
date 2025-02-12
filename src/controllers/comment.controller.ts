import { Request, Response } from "express";
import { initDb } from "../config/database";

// Initialize a single database connection
const db = initDb();

/**
 * Create a new comment.
 * Expects req.body to include: post_id, user_id, content.
 */
export const createComment = (req: Request, res: Response) => {
  const { post_id, user_id, content } = req.body;
  if (!post_id || !user_id || !content) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const id = crypto.randomUUID();
  db.prepare(
    "INSERT INTO comments (id, post_id, user_id, content) VALUES (?, ?, ?, ?)"
  ).run(id, post_id, user_id, content);

  res.status(201).json({ id, post_id, user_id, content });
};

/**
 * Get all comments for a specific post.
 * Expects req.params to include: post_id.
 */
export const getCommentsByPost = (req: Request, res: Response) => {
  const { postId } = req.params;
  if (!postId) {
    res.status(400).json({ error: "post_id parameter is required" });
    return;
  }

  const comments = db
    .prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY createdAt ASC")
    .all(postId);
  res.json(comments);
};

/**
 * Update a comment.
 * Expects req.params to include: id; and req.body to include: content.
 */
export const updateComment = (req: Request, res: Response) => {
  const { id } = req.params;
  const { content } = req.body;
  if (!content) {
    res.status(400).json({ error: "Missing content" });
    return;
  }

  db.prepare("UPDATE comments SET content = ? WHERE id = ?").run(content, id);
  res.json({ id, content });
};

/**
 * Delete a comment.
 * Expects req.params to include: id.
 */
export const deleteComment = (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare("DELETE FROM comments WHERE id = ?").run(id);
  res.json({ message: "Comment deleted" });
};
