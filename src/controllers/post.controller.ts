import { Response } from "express";
import type { AuthenticatedRequest } from "../models/authenticatedRequest.model";
import * as postService from "../services/post.service";

export const getAllPostsController = (
  _: AuthenticatedRequest,
  res: Response
) => {
  const posts = postService.getAllPostsService();
  res.json(posts);
};

export const getPostByIdController = (
  req: AuthenticatedRequest,
  res: Response
) => {
  const post = postService.getPostByIdService(req.params.id);
  if (post) res.json(post);
  else res.status(404).json({ error: "Post not found" });
};

export const createPostController = (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }
  const newPost = postService.createPostService(title, content);
  res.status(200).json(newPost);
};

export const updatePostController = (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { title, content } = req.body;
  const updatedPost = postService.updatePostService(
    req.params.id,
    title,
    content
  );
  res.json(updatedPost);
};

export const deletePostController = (
  req: AuthenticatedRequest,
  res: Response
) => {
  postService.deletePostService(req.params.id);
  res.json({ message: "Post deleted" });
};

export const searchPostsController = (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { q } = req.query;
  if (!q) {
    res.status(400).json({ error: "Query parameter is required" });
    return;
  }
  const posts = postService.searchPostsService(q as string);
  res.json(posts);
};
