import * as express from "express";
import {
  getAllPostsController,
  getPostByIdController,
  createPostController,
  updatePostController,
  deletePostController,
  searchPostsController,
} from "@/controllers/post.controller";
import { authorizeMiddleware } from "@/middleware/authorize.middleware";
import { validateBody } from "@/middleware/validate-body.middleware";
import {
  createPostSchema,
  deletePostParamsSchema,
  getPostByIdParamsSchema,
  searchPostQuerySchema,
  updatePostParamsSchema,
  updatePostSchema,
} from "@/validation/post.schemas";
import { validateParams } from "@/middleware/validate-params.middleware";
import { validateQuery } from "@/middleware/validate-query.middleware";
import {
  commentLimiter,
  searchLimiter,
} from "@/middleware/rate-limit.middleware";

const router = express.Router();

router.use(authorizeMiddleware);
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
