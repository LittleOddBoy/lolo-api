import { CommentRepository } from "~/repositories/comment.repository";
import { PostRepository } from "~/repositories/post.repository";

export class CommentService {
  /**
   * Retrieves all comments for a given post.
   *
   * @param postId - The ID of the post.
   * @returns An array of comments.
   */
  public static async getCommentsByPost(postId: string) {
    return await PostRepository.getCommentsByPost(postId);
  }

  /**
   * Creates a new comment in the database.
   *
   * @param postId - The ID of the post being commented on.
   * @param userId - The ID of the user creating the comment.
   * @param content - The content of the comment.
   * @returns The created comment object.
   */
  public static async createComment(
    postId: string,
    userId: string,
    content: string
  ) {
    return await CommentRepository.createNewComment(postId, userId, content);
  }

  /**
   * Updates a comment's content by its ID.
   *
   * @param id - The ID of the comment.
   * @param content - The new content for the comment.
   * @returns The updated comment object.
   */
  public static async updateComment(id: string, content: string) {
    return await CommentRepository.updateComment(id, content);
  }

  /**
   * Deletes a comment by its ID.
   *
   * @param id - The ID of the comment.
   */
  public static async deleteComment(id: string) {
    return await CommentRepository.deleteComment(id);
  }
}
