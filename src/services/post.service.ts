import { QueryTypes } from "sequelize";
import { sequelize } from "~/config/sequelize";
import { Post } from "~/db/models/post.model";

/**
 * Retrieves all posts from the database.
 *
 * @returns Array of post objects.
 */
export async function getAllPostsService() {
  return await Post.findAll();
}

/**
 * Retrieves a single post by its ID.
 *
 * @param {string} id - The UUID of the post.
 * @returns The post object if found; otherwise, undefined.
 */
export async function getPostByIdService(id: string) {
  return await Post.findOne({ where: { id } });
}

/**
 * Creates a new post in the database.
 *
 * @param {string} title - The title of the post.
 * @param {string} content - The content of the post.
 * @param {string} userId - The user's id that the post belongs to.
 * @returns The newly created post object.
 */
export async function createPostService(
  title: string,
  content: string,
  userId: string
) {
  const newPost = await Post.create({ title, content, userId });
  return newPost.dataValues;
}

/**
 * Updates an existing post.
 *
 * @param {string} id - The UUID of the post to update.
 * @param {string} title - The new title of the post.
 * @param {string} content - The new content of the post.
 * @returns An object containing the updated post data.
 */
export async function updatePostService(
  id: string,
  title: string,
  content: string
) {
  const targetPost = await Post.findOne({ where: { id } });
  const updatedPost = await targetPost?.update({ title, content });

  return updatedPost?.dataValues;
}

/**
 * Deletes a post from the database.
 *
 * @param {string} id - The UUID of the post to delete.
 */
export async function deletePostService(id: string) {
  const targetPost = await Post.findOne({ where: { id } });
  targetPost?.destroy();
}

/**
 * Searches for posts by a query string in the title or content.
 *
 * @param {string} query - The search term to match against posts.
 * @returns Array of posts matching the search criteria.
 */
export async function searchPostsService(query: string) {
  return await sequelize.query(
    "SELECT * FROM posts WHERE (title LIKE :query OR content LIKE :query)",
    {
      replacements: { query: `%${query}%` },
      type: QueryTypes.SELECT,
    }
  );
}
