import * as express from "express";
import * as cors from "cors";
import helmet from "helmet";
import { json } from "body-parser";
import * as dotenv from "dotenv";
import postRoutes from "./routes/post.routes";
import authRoutes from "./routes/auth.routes";
import commentRoutes from "./routes/comment.routes";
import { initDb } from "./config/database";
import { generalLimiter } from "./middleware/rateLimit.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(json());

const startServer = async () => {
  const db = initDb();

  // general middlewares
  app.use(generalLimiter);

  app.use("/v1/auth", authRoutes);
  app.use("/v1/posts", postRoutes);
  app.use("/v1/comments", commentRoutes);

  app.listen(PORT, () => {
    console.log(`🏃 LOLO is running on http://localhost:${PORT}`);
  });
};

startServer();
