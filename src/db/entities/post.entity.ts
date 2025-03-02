import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Comment } from "~/db/entities/comment.entity";
import { User } from "~/db/entities/user.entity";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 200 })
  title: string;

  @Column("text")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
