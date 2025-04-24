import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
import postRoutes from "~/routes/post.routes";
import authRoutes from "~/routes/auth.routes";
import commentRoutes from "~/routes/comment.routes";
import { generalLimiter } from "~/middleware/rate-limit.middleware";
import { versionMiddleware } from "~/middleware/version.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

const startServer = async () => {
  try {
    // general middlewares
    app.use(generalLimiter);

    app.use("/:version/auth", versionMiddleware, authRoutes);
    app.use("/:version/posts", versionMiddleware, postRoutes);
    app.use("/:version/comments", versionMiddleware, commentRoutes);

    app.listen(PORT, () => {
      console.log(`🏃 LOLO is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
