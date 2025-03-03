import express from "express";
import { AuthController } from "~/controllers/auth.controller";
import { validateBody } from "~/middleware/validate-body.middleware";
import { loginSchema, signupSchema } from "~/schemas/auth.schemas";
import { authLimiter } from "~/middleware/rate-limit.middleware";

const router = express.Router();

// rate limiter for authentication
router.use(authLimiter);

router.post("/signup", validateBody(signupSchema), AuthController.signup);
router.post("/login", validateBody(loginSchema), AuthController.login);

export default router;
