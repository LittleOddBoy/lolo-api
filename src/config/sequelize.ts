import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME || "lolo",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    host: process.env.DB_HOST || "localhost",
    dialect: "mysql",
    logging: false, // Set to 'console.log' for debugging SQL queries
  }
);

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL database successfully.");
    await sequelize.sync({ alter: true }); // Sync models with database
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};
