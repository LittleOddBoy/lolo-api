import * as express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
} from "../controllers/post.controller";
import { authenticationMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.use(authenticationMiddleware)
router.get("/search", searchPosts);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

export default router;
