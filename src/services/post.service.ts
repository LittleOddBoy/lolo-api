import { QueryTypes } from "sequelize";
import { sequelize } from "../config/sequelize";
import { Post } from "../models/Post";

/**
 * Retrieves all posts from the database.
 *
 * @returns {Array<Record<string, any>>} Array of post objects.
 */
export const getAllPostsService = async () => {
  // return db.prepare("SELECT * FROM posts").all();
  return await Post.findAll();
};

/**
 * Retrieves a single post by its ID.
 *
 * @param {string} id - The UUID of the post.
 * @returns {Record<string, any> | undefined} The post object if found, otherwise undefined.
 */
export const getPostByIdService = async (id: string) => {
  // return db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
  return await Post.findOne({ where: { id } });
};

/**
 * Creates a new post in the database.
 *
 * @param {string} title - The title of the post.
 * @param {string} content - The content of the post.
 * @returns {object} The newly created post object.
 */
export const createPostService = async (title: string, content: string) => {
  // const newPost = { id: crypto.randomUUID(), title, content };
  // db.prepare("INSERT INTO posts (id, title, content) VALUES (?, ?, ?)").run(
  //   newPost.id,
  //   newPost.title,
  //   newPost.content
  // );
  const newPost = await Post.create({ title, content });
  return newPost.dataValues;
};

/**
 * Updates an existing post.
 *
 * @param {string} id - The UUID of the post to update.
 * @param {string} title - The new title of the post.
 * @param {string} content - The new content of the post.
 * @returns {object} An object containing the updated post data.
 */
export const updatePostService = async (
  id: string,
  title: string,
  content: string
) => {
  // db.prepare("UPDATE posts SET title = ?, content = ? WHERE id = ?").run(
  //   title,
  //   content,
  //   id
  // );
  // return { id, title, content };
  const targetPost = await Post.findOne({ where: { id } });
  const updatedPost = await targetPost?.update({ title, content });

  return updatedPost?.dataValues;
};

/**
 * Deletes a post from the database.
 *
 * @param {string} id - The UUID of the post to delete.
 */
export const deletePostService = async (id: string) => {
  // db.prepare("DELETE FROM posts WHERE id = ?").run(id);
  const targetPost = await Post.findOne({ where: { id } });
  targetPost?.destroy();
};

/**
 * Searches for posts by a query string in the title or content.
 *
 * @param {string} query - The search term to match against posts.
 * @returns {Array<Record<string, any>>} Array of posts matching the search criteria.
 */
export const searchPostsService = async (query: string) => {
  // return db
  //   .prepare("SELECT * FROM posts WHERE title LIKE ? OR content LIKE ?")
  //   .all(`%${query}%`, `%${query}%`);
  return await sequelize.query(
    "SELECT * FROM posts WHERE (title LIKE :query OR content LIKE :query)",
    {
      replacements: { query: `%${query}%` },
      type: QueryTypes.SELECT,
    }
  );
};
