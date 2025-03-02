import { AppDataSource } from "~/config/app-data-source";
import { Post } from "~/db/entities/post.entity";
import { User } from "~/db/entities/user.entity";

export const PostRepository = AppDataSource.getRepository(Post).extend({
  async createNewPost(title: string, content: string, userId: string) {
    return await AppDataSource.transaction(async (tem) => {
      // get user
      console.log(userId);
      const targetUser = await tem
        .getRepository(User)
        .findOne({ where: { id: userId } });

      // Check if such user does exist
      console.log(targetUser);
      if (!targetUser) {
        return "No such user";
      }

      // Insert the new post
      const result = await tem
        .createQueryBuilder()
        .insert()
        .into(Post)
        .values({ title, content, user: targetUser })
        .execute();

      return {
        title,
        content,
        userId,
        ...result.generatedMaps[0],
      };
    });
  },

  async findPostById(id: string) {
    return await this.createQueryBuilder("post")
      .where("post.id = :id", { id })
      .getOne();
  },

  async updatePost(id: string, title: string, content: string) {
    return await AppDataSource.transaction(async (tem) => {
      // retrieve the post
      const targetPost = await this.findOne({ where: { id } });

      // check if such post does exist
      if (!targetPost) {
        return "No such post does exist";
      }

      // update the post
      targetPost.title = title;
      targetPost.content = content;
      await tem.save(targetPost);
      return targetPost as Post;
    });
  },

  async deletePost(id: string) {
    return await this.createQueryBuilder("post")
      .delete()
      .from(Post, "posts")
      .where("posts.id = :id", { id })
      .execute();
  },

  async searchByKeyword(q: string) {
    return await this.createQueryBuilder("post")
      .where("post.title LIKE :keyword", { keyword: `%${q}%` })
      .orWhere("post.content LIKE :keyword", { keyword: `%${q}%` })
      .orderBy("post.createdAt", "DESC")
      .getMany();
  },
});
