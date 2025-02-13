import * as express from "express";
import {
  signupController,
  loginController,
} from "../controllers/auth.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import { loginSchema, signupSchema } from "../validation/auth.schemas";
import { authLimiter } from "../middleware/rateLimit.middleware";

const router = express.Router();

// rate limiter for authentication
router.use(authLimiter);

router.post("/signup", validateBody(signupSchema), signupController);
router.post("/login", validateBody(loginSchema), loginController);

export default router;
