import { Response } from "express";
import { CommentService } from "~/services/v2/comment.service";
import { CompleteRequest } from "~/interfaces/complete-request.interface";

/**
 * Control and handle main comment tasks.
 */
export class CommentController {
  /**
   * Get all the comments for a specific `postId`
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async getCommentsById(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { postId } = req.params;

    // Require the post id
    if (!postId) {
      res.status(400).json({ error: "`postId` parameter is required" });
      return;
    }

    // Get post's comments
    const comments = await CommentService.getCommentsByPost(postId);
    res.status(200).json(comments);
  }

  /**
   * Create a comment for a specific post
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async createComment(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { postId, userId, content } = req.body;

    // Require fields in body
    if (!postId || !userId || !content) {
      res.status(400).json({ error: "Missing fields" });
      return;
    }

    // Create a comment for a specific post
    const newComment = await CommentService.createComment(
      postId,
      userId,
      content
    );
    res.status(201).json(newComment);
  }

  /**
   * Update a comment of a post
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async updateComment(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { id } = req.params;
    const { content } = req.body;

    // Require content for the comment
    if (!content) {
      res.status(400).json({ error: "Missing content" });
      return;
    }

    // Update a comment
    const updatedComment = await CommentService.updateComment(id, content);
    res.json(updatedComment);
  }

  /**
   * Delete a specific comment
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async deleteComment(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    const { id } = req.params;

    // Delete a comment
    await CommentService.deleteComment(id);
    res.json({ message: "Comment deleted" });
  }
}
