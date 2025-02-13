import * as express from "express";
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
} from "../controllers/comment.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import {
  commentParamsSchema,
  createCommentSchema,
  getCommentsByPostParamsSchema,
  updateCommentSchema,
} from "../validation/comment.schemas";
import { validateParams } from "../middleware/validateParams.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { postCommentLimiter } from "../middleware/rateLimit.middleware";

const router = express.Router();

router.use(authorize);
router.use(postCommentLimiter);

router.post("/", validateBody(createCommentSchema), createComment);
router.get(
  "/post/:postId",
  validateParams(getCommentsByPostParamsSchema),
  getCommentsByPost
);
router.put(
  "/:id",
  validateParams(commentParamsSchema),
  validateBody(updateCommentSchema),
  updateComment
);
router.delete("/:id", validateParams(commentParamsSchema), deleteComment);

export default router;
