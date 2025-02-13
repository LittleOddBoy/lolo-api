import * as express from "express";
import {
  createCommentController,
  getCommentsByPostController,
  updateCommentController,
  deleteCommentController,
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

router.post("/", validateBody(createCommentSchema), createCommentController);
router.get(
  "/post/:postId",
  validateParams(getCommentsByPostParamsSchema),
  getCommentsByPostController
);
router.put(
  "/:id",
  validateParams(commentParamsSchema),
  validateBody(updateCommentSchema),
  updateCommentController
);
router.delete("/:id", validateParams(commentParamsSchema), deleteCommentController);

export default router;
