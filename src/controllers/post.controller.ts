import { Request, Response } from "express";
import { initDb } from "../config/database";

const db = initDb();

export const getAllPosts = (_: Request, res: Response) => {
  const posts = db.prepare("SELECT * FROM posts").all();
  res.json(posts);
};

export const getPostById = (req: Request, res: Response) => {
  const post = db
    .prepare("SELECT * FROM posts WHERE id = ?")
    .get(req.params.id);
  if (post) res.json(post);
  else res.status(404).json({ error: "Post not found" });
};

export const createPost = (req: Request, res: Response) => {
  // get and validate request body and its data
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const newPost = { id: crypto.randomUUID(), title, content };
  const result = db
    .prepare("INSERT INTO posts (id, title, content) VALUES (?, ?, ?)")
    .run(...Object.values(newPost));

  res.status(200).json({
    id: newPost.id,
    title: newPost.title,
    content: newPost.content,
  });
};

export const updatePost = (req: Request, res: Response) => {
  const { title, content } = req.body;
  db.prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?").run(
    title,
    content,
    req.params.id
  );
  res.json({ id: req.params.id, title, content });
};

export const deletePost = (req: Request, res: Response) => {
  db.prepare("DELETE FROM posts WHERE id = ?").run(req.params.id);
  res.json({ message: "Post deleted" });
};

export const searchPosts = (req: Request, res: Response) => {
  const { q } = req.query;
  if (!q) {
    res.status(400).json({ error: "Query parameter is required" });
    return;
  }
  const posts = db
    .prepare("SELECT * FROM posts WHERE title LIKE ? OR content LIKE ?")
    .all(`%${q}%`, `%${q}%`);
  res.json(posts);
};
