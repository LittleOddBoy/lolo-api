import { Response } from "express";
import type { AuthenticatedRequestType } from "../interfaces/authenticatedRequest.interface";
import * as postService from "../services/post.service";

export const getAllPostsController = async (
  _: AuthenticatedRequestType,
  res: Response
) => {
  const posts = await postService.getAllPostsService();
  res.json(posts);
};

export const getPostByIdController = async (
  req: AuthenticatedRequestType,
  res: Response
) => {
  const post = await postService.getPostByIdService(req.params.id);
  if (post) res.json(post);
  else res.status(404).json({ error: "Post not found" });
};

export const createPostController = async (
  req: AuthenticatedRequestType,
  res: Response
) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    res.status(400).json({ error: "Missing fields" });
    return;
  }

  const newPost = await postService.createPostService(title, content, userId);
  res.status(200).json(newPost);
};

export const updatePostController = async (
  req: AuthenticatedRequestType,
  res: Response
) => {
  const { title, content } = req.body;
  const updatedPost = await postService.updatePostService(
    req.params.id,
    title,
    content
  );
  res.json(updatedPost);
};

export const deletePostController = async (
  req: AuthenticatedRequestType,
  res: Response
) => {
  await postService.deletePostService(req.params.id);
  res.json({ message: "Post deleted" });
};

export const searchPostsController = async (
  req: AuthenticatedRequestType,
  res: Response
) => {
  const { q } = req.query;
  if (!q) {
    res.status(400).json({ error: "Query parameter is required" });
    return;
  }
  const posts = await postService.searchPostsService(q as string);
  res.json(posts);
};
