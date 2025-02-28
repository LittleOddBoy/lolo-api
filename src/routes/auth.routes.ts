import * as express from "express";
import {
  signupController,
  loginController,
} from "@/controllers/auth.controller";
import { validateBody } from "@/middleware/validate-body.middleware";
import { loginSchema, signupSchema } from "@/validation/auth.schemas";
import { authLimiter } from "@/middleware/rate-limit.middleware";

const router = express.Router();

// rate limiter for authentication
router.use(authLimiter);

router.post("/signup", validateBody(signupSchema), signupController);
router.post("/login", validateBody(loginSchema), loginController);

export default router;
