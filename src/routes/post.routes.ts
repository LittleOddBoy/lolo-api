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
import { validate } from "../middleware/validation.middleware";
import { createPostSchema, updatePostSchema } from "../validation/post.schemas";

const router = express.Router();

router.use(authenticationMiddleware);
router.get("/search", searchPosts);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", validate(createPostSchema), createPost);
router.put("/:id", validate(updatePostSchema), updatePost);
router.delete("/:id", deletePost);

export default router;
