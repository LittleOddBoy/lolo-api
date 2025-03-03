import express from "express";
// import {
//   getAllPostsController,
//   getPostByIdController,
//   createPostController,
//   updatePostController,
//   deletePostController,
//   searchPostsController,
// } from "~/controllers/post.controller";
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

router.use(authorizeMiddleware);
router.use(commentLimiter);

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
