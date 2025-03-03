import { AppDataSource } from "~/config/app-data-source";
import { Comment } from "~/db/entities/comment.entity";
import { Post } from "~/db/entities/post.entity";
import { User } from "~/db/entities/user.entity";

export const CommentRepository = AppDataSource.getRepository(Comment).extend({
  async createNewComment(postId: string, userId: string, content: string) {
    return await AppDataSource.transaction(async (tem) => {
      const targetPost = await tem
        .getRepository(Post)
        .findOne({ where: { id: postId } });

      const targetUser = await tem
        .getRepository(User)
        .findOne({ where: { id: userId } });

      if (!targetPost || !targetUser) {
        return "No such post/user does exist!";
      }

      const result = await tem
        .createQueryBuilder()
        .insert()
        .into(Comment)
        .values({ user: targetUser, post: targetPost, content })
        .execute();

      return {
        user: targetUser.id,
        post: targetPost.id,
        content,
        ...result.generatedMaps[0],
      };
    });
  },

  

  async updateComment(commentId: string, content: string) {
    return await AppDataSource.transaction(async (tem) => {
      const targetComment = await tem
        .getRepository(Comment)
        .findOne({ where: { id: commentId } });

      if (!targetComment) {
        return "No such comment does exist!";
      }

      targetComment.content = content;
      await tem.save(targetComment);
      return targetComment;
    });
  },

  async deleteComment(commentId: string) {
    return await this.createQueryBuilder("comment")
      .delete()
      .from(Comment, "comments")
      .where("comments.id = :commentId", { commentId })
      .execute();
  },
});
