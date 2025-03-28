import { Response } from "express";
import type { CompleteRequest } from "~/interfaces/complete-request.interface";
import { PostService } from "~/services/v2/post.service";

/**
 * Control and handle post's main tasks.
 */
export class PostController {
  /**
   * Get all the posts
   * @param _ {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async getAllPosts(
    _: CompleteRequest,
    res: Response
  ): Promise<void> {
    const posts = await PostService.getAllPosts();
    res.json(posts);
  }

  /**
   * Get a post by its id
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async getPostById(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    // Get the post by its id
    const post = await PostService.getPostById(req.params.id as string);

    // Response with the post data if it exists
    if (post) res.json(post);
    else res.status(404).json({ error: "Post not found" });
  }

  /**
   * Create a new post
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async createPost(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { title, content, userId } = req.body;

    // Require initial post data
    if (!title || !content || !userId) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }

    // Create a new post with its initial data
    const newPost = await PostService.createPost(title, content, userId);
    res.status(200).json(newPost);
  }

  /**
   * Update an existing post
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async updatePost(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { title, content } = req.body;

    // Require the content for the updated post
    if (!content) {
      res.status(400).json({ error: "Missing content" });
      return;
    }

    // Update the post
    const updatedPost = await PostService.updatePost(
      req.params.id,
      title,
      content
    );
    res.json(updatedPost);
  }

  /**
   * Delete an existing post
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async deletePost(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    await PostService.deletePost(req.params.id);
    res.json({ message: "Post deleted" });
  }

  /**
   * Search for a post by keyword
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async searchPosts(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { q } = req.query;

    // Require a query for search
    if (!q) {
      res.status(400).json({ error: "Query parameter is required" });
      return;
    }

    // Search for a post by keyword
    const posts = await PostService.searchPosts(q as string);
    res.json(posts);
  }
}
