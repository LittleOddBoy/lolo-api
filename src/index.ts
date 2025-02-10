import * as express from "express";
import * as cors from "cors";
import { json } from "body-parser";
import * as dotenv from "dotenv";
import postRoutes from "./routes/post.routes";
import { initDb } from "./config/database";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(json());

const startServer = async () => {
  const db = initDb();
  app.use("/posts", postRoutes);

  app.listen(PORT, () => {
    console.log(`🏃 LOLO is running on http://localhost:${PORT}`);
  });
};

startServer();
