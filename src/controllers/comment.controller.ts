import { Response } from "express";
import { CommentService } from "~/services/comment.service";
import { CompleteRequest } from "~/interfaces/complete-request.interface";

export class CommentController {
  public static async getCommentsById(
    req: CompleteRequest,
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
    req: CompleteRequest,
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
    req: CompleteRequest,
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
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    await CommentService.deleteComment(id);
    res.json({ message: "Comment deleted" });
  }
}
