import express from "express";
import { CommentController } from "~/controllers/comment.controller";
import {
  commentParamsSchema,
  createCommentSchema,
  getCommentsByPostParamsSchema,
  updateCommentSchema,
} from "~/schemas/comment.schemas";
import { validateBody, validateParams } from "~/middleware/validate.middleware";
import { authorizeMiddleware } from "~/middleware/authorize.middleware";
import { commentLimiter } from "~/middleware/rate-limit.middleware";

const router = express.Router();

// General middlewares for this group of routes
router.use(authorizeMiddleware); // Ensure the request is authorized
router.use(commentLimiter); // Apply comment's rate-limiter

router.get(
  "/post/:postId",
  validateParams(getCommentsByPostParamsSchema),
  CommentController.getCommentsById
);

router.post("/", validateBody(createCommentSchema), CommentController.createComment);

router.put(
  "/:id",
  validateParams(commentParamsSchema),
  validateBody(updateCommentSchema),
  CommentController.updateComment
);

router.delete(
  "/:id",
  validateParams(commentParamsSchema),
  CommentController.deleteComment
);

export default router;
