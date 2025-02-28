import { DataTypes } from "sequelize";
import { sequelize } from "~/config/sequelize"; 
import { User } from "~/db/models/user.model"; 

export const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
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

Post.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Post, { foreignKey: "userId" });
