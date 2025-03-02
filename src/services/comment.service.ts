import { CommentRepository } from "~/repositories/comment.repository";
import { PostRepository } from "~/repositories/post.repository";

/**
 * Creates a new comment in the database.
 *
 * @param postId - The ID of the post being commented on.
 * @param userId - The ID of the user creating the comment.
 * @param content - The content of the comment.
 * @returns The created comment object.
 */
export async function createCommentService(
  postId: string,
  userId: string,
  content: string
) {
  return await CommentRepository.createNewComment(postId, userId, content);
}

/**
 * Retrieves all comments for a given post.
 *
 * @param postId - The ID of the post.
 * @returns An array of comments.
 */
export async function getCommentsByPostService(postId: string) {
  return await PostRepository.getCommentsByPost(postId);
}

/**
 * Updates a comment's content by its ID.
 *
 * @param id - The ID of the comment.
 * @param content - The new content for the comment.
 * @returns The updated comment object.
 */
export async function updateCommentService(id: string, content: string) {
  return await CommentRepository.updateComment(id, content);
}

/**
 * Deletes a comment by its ID.
 *
 * @param id - The ID of the comment.
 */
export async function deleteCommentService(id: string) {
  await CommentRepository.deleteComment(id);
}
