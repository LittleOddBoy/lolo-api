import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

export const db = drizzle(
  process.env.DATABASE_URL ?? "mysql://root@localhost:3306/lolo_api"
);
