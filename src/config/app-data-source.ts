import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "lolo_api",
  logging: false,
  synchronize: true,
  entities: [join(__dirname, "/../db/entities/*.entity.{js,ts}")],
  migrations: [join(__dirname, "/../db/entities/*.entity.{js,ts}")],
});

export async function connectDb() {
  try {
    await AppDataSource.initialize();
    console.log("✅ Connected to MySQL database successfully.");
  } catch (error) {
    console.log("❌ Database connection failed:", error);
  }
}
