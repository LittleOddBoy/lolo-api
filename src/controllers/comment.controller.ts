import { Request, Response } from "express";
import { initDb } from "../config/database";

const db = initDb();

export const createComment = (req: Request, res: Response) => {
  const { postId, userId, content } = req.body;
  if (!postId || !userId || !content) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const id = crypto.randomUUID();
  db.prepare(
    "INSERT INTO comments (id, post_id, user_id, content) VALUES (?, ?, ?, ?)"
  ).run(id, postId, userId, content);

  res.status(201).json({ id, post_id: postId, user_id: userId, content });
};

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

export const deleteComment = (req: Request, res: Response) => {
  const { id } = req.params;
  db.prepare("DELETE FROM comments WHERE id = ?").run(id);
  res.json({ message: "Comment deleted" });
};
