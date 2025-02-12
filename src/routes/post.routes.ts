import * as express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
} from "../controllers/post.controller";
import { auth } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validateBody.middleware";
import {
  createPostSchema,
  deletePostParamsSchema,
  getPostByIdParamsSchema,
  searchPostQuerySchema,
  updatePostParamsSchema,
  updatePostSchema,
} from "../validation/post.schemas";
import { validateParams } from "../middleware/validateParams.middleware";
import { validateQuery } from "../middleware/validateQuery.middleware";

const router = express.Router();

router.use(auth);
router.get("/search", validateQuery(searchPostQuerySchema), searchPosts);
router.get("/", getAllPosts);
router.get("/:id", validateParams(getPostByIdParamsSchema), getPostById);
router.post("/", validateBody(createPostSchema), createPost);
router.put(
  "/:id",
  validateParams(updatePostParamsSchema),
  validateBody(updatePostSchema),
  updatePost
);
router.delete("/:id", validateParams(deletePostParamsSchema), deletePost);

export default router;
