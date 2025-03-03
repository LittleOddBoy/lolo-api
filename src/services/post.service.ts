import { PostRepository } from "~/repositories/post.repository";

export class PostService {
  public static async getAllPosts() {
    return await PostRepository.find();
  }

  public static async getPostById(id: string) {
    return await PostRepository.findPostById(id);
  }

  public static async createPost(
    title: string,
    content: string,
    userId: string
  ) {
    const newPost = await PostRepository.createNewPost(title, content, userId);
    return newPost;
  }

  public static async updatePost(
    id: string,
    title: string,
    content: string
  ) {
    return await PostRepository.updatePost(id, title, content);
  }

  public static async deletePost(id: string) {
    return await PostRepository.deletePost(id);
  }

  public static async searchPosts(query: string) {
    return await PostRepository.searchByKeyword(query);
  }
}

/**
 * Retrieves all posts from the database.
 *
 * @returns Array of post objects.
 */
// export async function getAllPostsService() {
//   return await PostRepository.find();
// }

/**
 * Retrieves a single post by its ID.
 *
 * @param {string} id - The UUID of the post.
 * @returns The post object if found; otherwise, undefined.
 */
// export async function getPostByIdService(id: string) {
//   return await PostRepository.findPostById(id);
// }

/**
 * Creates a new post in the database.
 *
 * @param {string} title - The title of the post.
 * @param {string} content - The content of the post.
 * @param {string} userId - The user's id that the post belongs to.
 * @returns The newly created post object.
 */
// async createPostService(
//   title: string,
//   content: string,
//   userId: string
// ) {
//   const newPost = await PostRepository.createNewPost(title, content, userId);
//   return newPost;
// }

/**
 * Updates an existing post.
 *
 * @param {string} id - The UUID of the post to update.
 * @param {string} title - The new title of the post.
 * @param {string} content - The new content of the post.
 * @returns An object containing the updated post data.
 */
// export async function updatePostService(
//   id: string,
//   title: string,
//   content: string
// ) {
//   return await PostRepository.updatePost(id, title, content);
// }

/**
 * Deletes a post from the database.
 *
 * @param {string} id - The UUID of the post to delete.
 */
// export async function deletePostService(id: string) {
//   return await PostRepository.deletePost(id);
// }

/**
 * Searches for posts by a query string in the title or content.
 *
 * @param {string} query - The search term to match against posts.
 * @returns Array of posts matching the search criteria.
 */
// export async function searchPostsService(query: string) {
//   return await PostRepository.searchByKeyword(query);
// }
