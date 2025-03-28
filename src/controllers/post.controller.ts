import { Response } from "express";
import type { CompleteRequest } from "~/interfaces/complete-request.interface";
import { PostService } from "~/services/v2/post.service";

export class PostController {
  public static async getAllPosts(
    _: CompleteRequest,
    res: Response
  ): Promise<void> {
    const posts = await PostService.getAllPosts();
    res.json(posts);
  }

  public static async getPostById(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const post = await PostService.getPostById(req.params.id as string);
    if (post) res.json(post);
    else res.status(404).json({ error: "Post not found" });
  }

  public static async createPost(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { title, content, userId } = req.body;
    if (!title || !content || !userId) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }

    const newPost = await PostService.createPost(title, content, userId);
    res.status(200).json(newPost);
  }

  public static async updatePost(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { title, content } = req.body;
    const updatedPost = await PostService.updatePost(
      req.params.id,
      title,
      content
    );
    res.json(updatedPost);
  }

  public static async deletePost(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    await PostService.deletePost(req.params.id);
    res.json({ message: "Post deleted" });
  }

  public static async searchPosts(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { q } = req.query;
    if (!q) {
      res.status(400).json({ error: "Query parameter is required" });
      return;
    }
    const posts = await PostService.searchPosts(q as string);
    res.json(posts);
  }
}
