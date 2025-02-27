import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize";
import { User } from "./User";
import { Post } from "./Post";

export const Comment = sequelize.define("Comment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Comment.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
Comment.belongsTo(Post, { foreignKey: "postId", onDelete: "CASCADE" });

User.hasMany(Comment, { foreignKey: "userId" });
Post.hasMany(Comment, { foreignKey: "postId" });
