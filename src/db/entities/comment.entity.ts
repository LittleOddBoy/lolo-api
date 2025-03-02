import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { Post } from "~/db/entities/post.entity";
import { User } from "~/db/entities/user.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: "CASCADE" })
  post: Post;
}
