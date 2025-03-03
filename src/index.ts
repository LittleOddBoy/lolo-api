import express from "express";
import cors from "cors";
import helmet from "helmet";
import * as dotenv from "dotenv";
import postRoutes from "~/routes/post.routes";
import authRoutes from "~/routes/auth.routes";
import commentRoutes from "~/routes/comment.routes";
import { connectDb } from "~/config/app-data-source";
import { generalLimiter } from "~/middleware/rate-limit.middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

const startServer = async () => {
  try {
    await connectDb();

    // general middlewares
    app.use(generalLimiter);

    app.use("/v2/auth", authRoutes);
    app.use("/v2/posts", postRoutes);
    app.use("/v2/comments", commentRoutes);

    app.listen(PORT, () => {
      console.log(`🏃 LOLO is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();
