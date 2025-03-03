import express from "express";
import { CommentController } from "~/controllers/comment.controller";
import { validateBody } from "~/middleware/validate-body.middleware";
import {
  commentParamsSchema,
  createCommentSchema,
  getCommentsByPostParamsSchema,
  updateCommentSchema,
} from "~/schemas/comment.schemas";
import { validateParams } from "~/middleware/validate-params.middleware";
import { authorizeMiddleware } from "~/middleware/authorize.middleware";
import { commentLimiter } from "~/middleware/rate-limit.middleware";

const router = express.Router();

router.use(authorizeMiddleware);
router.use(commentLimiter);

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
