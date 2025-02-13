import * as express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
} from "../controllers/post.controller";
import { authorize } from "../middleware/authorize.middleware";
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
import {
  postCommentLimiter,
  searchLimiter,
} from "../middleware/rateLimit.middleware";

const router = express.Router();

router.use(authorize);
router.use(postCommentLimiter);

router.get(
  "/search",
  searchLimiter,
  validateQuery(searchPostQuerySchema),
  searchPosts
);
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
