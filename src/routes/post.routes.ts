import * as express from "express";
import {
  getAllPostsController,
  getPostByIdController,
  createPostController,
  updatePostController,
  deletePostController,
  searchPostsController,
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
  commentLimiter,
  searchLimiter,
} from "../middleware/rateLimit.middleware";

const router = express.Router();

router.use(authorize);
router.use(commentLimiter);

router.get(
  "/search",
  searchLimiter,
  validateQuery(searchPostQuerySchema),
  searchPostsController
);
router.get("/", getAllPostsController);
router.get(
  "/:id",
  validateParams(getPostByIdParamsSchema),
  getPostByIdController
);
router.post("/", validateBody(createPostSchema), createPostController);
router.put(
  "/:id",
  validateParams(updatePostParamsSchema),
  validateBody(updatePostSchema),
  updatePostController
);
router.delete(
  "/:id",
  validateParams(deletePostParamsSchema),
  deletePostController
);

export default router;
