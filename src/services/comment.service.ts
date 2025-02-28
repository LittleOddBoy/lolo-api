import { Comment } from "~/src/db/models/comment.model";

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
  const newComment = await Comment.create({ postId, userId, content });
  return newComment.dataValues;
}

/**
 * Retrieves all comments for a given post.
 *
 * @param postId - The ID of the post.
 * @returns An array of comments.
 */
export async function getCommentsByPostService(postId: string) {
  return await Comment.findOne({
    where: { postId },
    order: [["createdAt", "ASC"]],
  });
}

/**
 * Updates a comment's content by its ID.
 *
 * @param id - The ID of the comment.
 * @param content - The new content for the comment.
 * @returns The updated comment object.
 */
export async function updateCommentService(id: string, content: string) {
  const targetComment = await Comment.findOne({ where: { id } });
  const updatedComment = await targetComment?.update({ content });
  return updatedComment?.dataValues;
}

/**
 * Deletes a comment by its ID.
 *
 * @param id - The ID of the comment.
 */
export async function deleteCommentService(id: string) {
  const targetComment = await Comment.findOne({ where: { id } });
  targetComment?.destroy();
}
