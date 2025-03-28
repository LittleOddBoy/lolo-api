import express from "express";
import { PostController } from "~/controllers/post.controller";
import { authorizeMiddleware } from "~/middleware/authorize.middleware";
import { validateBody } from "~/middleware/validate-body.middleware";
import {
  createPostSchema,
  deletePostParamsSchema,
  getPostByIdParamsSchema,
  searchPostQuerySchema,
  updatePostParamsSchema,
  updatePostSchema,
} from "~/schemas/post.schemas";
import { validateParams } from "~/middleware/validate-params.middleware";
import { validateQuery } from "~/middleware/validate-query.middleware";
import {
  commentLimiter,
  searchLimiter,
} from "~/middleware/rate-limit.middleware";

const router = express.Router();

// General middlewares for this group of routes
router.use(authorizeMiddleware); // Ensure all the requests are authorized
router.use(commentLimiter); // Apply comment's rate-limiter (don't ask why)

router.get(
  "/search",
  searchLimiter,
  validateQuery(searchPostQuerySchema),
  PostController.searchPosts
);
router.get("/", PostController.getAllPosts);
router.get(
  "/:id",
  validateParams(getPostByIdParamsSchema),
  PostController.getPostById
);

router.post("/", validateBody(createPostSchema), PostController.createPost);

router.put(
  "/:id",
  validateParams(updatePostParamsSchema),
  validateBody(updatePostSchema),
  PostController.updatePost
);

router.delete(
  "/:id",
  validateParams(deletePostParamsSchema),
  PostController.deletePost
);

export default router;
