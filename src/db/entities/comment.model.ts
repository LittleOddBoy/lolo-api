import { DataTypes } from "sequelize";
import { sequelize } from "~/src/config/sequelize";
import { User } from "~/src/db/entities/user.model";
import { Post } from "~/src/db/entities/post.model";

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
