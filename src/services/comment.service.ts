import { initDb } from "../config/database";

const db = initDb();

/**
 * Creates a new comment in the database.
 * @param postId - The ID of the post being commented on.
 * @param userId - The ID of the user creating the comment.
 * @param content - The content of the comment.
 * @returns The created comment object.
 */
export const createCommentService = (postId: string, userId: string, content: string) => {
  const id = crypto.randomUUID();
  db.prepare(
    "INSERT INTO comments (id, post_id, user_id, content) VALUES (?, ?, ?, ?)"
  ).run(id, postId, userId, content);
  return { id, post_id: postId, user_id: userId, content };
};

/**
 * Retrieves all comments for a given post.
 * @param postId - The ID of the post.
 * @returns An array of comments.
 */
export const getCommentsByPostService = (postId: string) => {
  return db
    .prepare("SELECT * FROM comments WHERE post_id = ? ORDER BY createdAt ASC")
    .all(postId);
};

/**
 * Updates a comment's content by its ID.
 * @param id - The ID of the comment.
 * @param content - The new content for the comment.
 * @returns The updated comment object.
 */
export const updateCommentService = (id: string, content: string) => {
  db.prepare("UPDATE comments SET content = ? WHERE id = ?").run(content, id);
  return { id, content };
};

/**
 * Deletes a comment by its ID.
 * @param id - The ID of the comment.
 */
export const deleteCommentService = (id: string) => {
  db.prepare("DELETE FROM comments WHERE id = ?").run(id);
};
