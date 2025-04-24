import { relations } from "drizzle-orm";
import {
  mysqlTable,
  serial,
  timestamp,
  varchar,
  int,
} from "drizzle-orm/mysql-core";

// USERS TABLE SCHEMA
export const users = mysqlTable("users", {
  id: serial().primaryKey(),
  username: varchar({ length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// POSTS TABLE SCHEMA & RELATIONS
export const posts = mysqlTable("posts", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  content: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const postsRelations = relations(posts, ({ many }) => ({
  comments: many(comments),
}));

// COMMENTS TABLE SCHEMA & RELATIONS
export const comments = mysqlTable("comments", {
  id: serial().primaryKey(),
  userId: int("user_id"),
  postId: int("post_id"),
  content: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
}));
