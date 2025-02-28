import * as express from "express";
import {
  createCommentController,
  getCommentsByPostController,
  updateCommentController,
  deleteCommentController,
} from "@/controllers/comment.controller";
import { validateBody } from "@/middleware/validate-body.middleware";
import {
  commentParamsSchema,
  createCommentSchema,
  getCommentsByPostParamsSchema,
  updateCommentSchema,
} from "@/validation/comment.schemas";
import { validateParams } from "@/middleware/validate-params.middleware";
import { authorizeMiddleware } from "@/middleware/authorize.middleware";
import { commentLimiter } from "@/middleware/rate-limit.middleware";

const router = express.Router();

router.use(authorizeMiddleware);
router.use(commentLimiter);

router.get(
  "/post/:postId",
  validateParams(getCommentsByPostParamsSchema),
  getCommentsByPostController
);
router.post("/", validateBody(createCommentSchema), createCommentController);
router.put(
  "/:id",
  validateParams(commentParamsSchema),
  validateBody(updateCommentSchema),
  updateCommentController
);
router.delete(
  "/:id",
  validateParams(commentParamsSchema),
  deleteCommentController
);

export default router;
