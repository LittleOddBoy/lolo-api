import { Request, Response } from "express";
// import * as commentService from "~/services/comment.service";
import { CommentService } from "~/services/comment.service";
import { AuthenticatedRequestType } from "~/interfaces/authenticatedRequest.interface";

export class CommentController {
  public static async getCommentsById(
    req: AuthenticatedRequestType,
    res: Response
  ): Promise<void> {
    const { postId } = req.params;
    if (!postId) {
      res.status(400).json({ error: "`postId` parameter is required" });
      return;
    }

    const comments = await CommentService.getCommentsByPost(postId);
    res.status(200).json(comments);
  }

  public static async createComment(
    req: AuthenticatedRequestType,
    res: Response
  ): Promise<void> {
    const { postId, userId, content } = req.body;
    if (!postId || !userId || !content) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }

    const newComment = await CommentService.createComment(
      postId,
      userId,
      content
    );
    res.status(201).json(newComment);
  }

  public static async updateComment(
    req: AuthenticatedRequestType,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
      res.status(400).json({ error: "Missing content" });
      return;
    }

    const updatedComment = await CommentService.updateComment(id, content);
    res.json(updatedComment);
  }

  public static async deleteComment(
    req: AuthenticatedRequestType,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    await CommentService.deleteComment(id);
    res.json({ message: "Comment deleted" });
  }
}

// export const createCommentController = async (
//   req: AuthenticatedRequestType,
//   res: Response
// ) => {
//   const { postId, userId, content } = req.body;
//   if (!postId || !userId || !content) {
//     res.status(400).json({ error: "Missing fields" });
//     return;
//   }

//   const newComment = await commentService.createCommentService(
//     postId,
//     userId,
//     content
//   );
//   res.status(201).json(newComment);
// };

// export const getCommentsByPostController = async (
//   req: AuthenticatedRequestType,
//   res: Response
// ) => {
//   const { postId } = req.params;
//   if (!postId) {
//     res.status(400).json({ error: "`postId` parameter is required" });
//     return;
//   }

//   const comments = await commentService.getCommentsByPostService(postId);
//   res.status(200).json(comments);
// };

// export const updateCommentController = async (
//   req: AuthenticatedRequestType,
//   res: Response
// ) => {
//   const { id } = req.params;
//   const { content } = req.body;
//   if (!content) {
//     res.status(400).json({ error: "Missing content" });
//     return;
//   }

//   const updatedComment = await commentService.updateCommentService(id, content);
//   res.json(updatedComment);
// };

// export const deleteCommentController = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   await commentService.deleteCommentService(id);
//   res.json({ message: "Comment deleted" });
// };
