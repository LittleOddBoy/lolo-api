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
import { auth } from "../middleware/auth.middleware";

const router = express.Router();

// ensure all the requests are authorized
router.use(auth);

// Create a new comment
router.post("/", validateBody(createCommentSchema), createComment);

// Get all comments for a specific post (e.g., GET /comments/post/:post_id)
router.get(
  "/post/:postId",
  validateParams(getCommentsByPostParamsSchema),
  getCommentsByPost
);

// Update a comment by its id (e.g., PUT /comments/:id)
router.put(
  "/:id",
  validateParams(commentParamsSchema),
  validateBody(updateCommentSchema),
  updateComment
);

// Delete a comment by its id (e.g., DELETE /comments/:id)
router.delete("/:id", validateParams(commentParamsSchema), deleteComment);

export default router;
