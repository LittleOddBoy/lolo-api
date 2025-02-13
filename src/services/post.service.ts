import { initDb } from "../config/database";

const db = initDb();

export const getAllPostsService = () => {
  return db.prepare("SELECT * FROM posts").all();
};

export const getPostByIdService = (id: string) => {
  return db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
};

export const createPostService = (title: string, content: string) => {
  const newPost = { id: crypto.randomUUID(), title, content };
  db.prepare("INSERT INTO posts (id, title, content) VALUES (?, ?, ?)")
    .run(newPost.id, newPost.title, newPost.content);
  return newPost;
};

export const updatePostService = (id: string, title: string, content: string) => {
  db.prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?")
    .run(title, content, id);
  return { id, title, content };
};

export const deletePostService = (id: string) => {
  db.prepare("DELETE FROM posts WHERE id = ?").run(id);
};

export const searchPostsService = (query: string) => {
  return db
    .prepare("SELECT * FROM posts WHERE title LIKE ? OR content LIKE ?")
    .all(`%${query}%`, `%${query}%`);
};
