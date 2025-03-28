import express from "express";
import { AuthController } from "~/controllers/auth.controller";
import { validateBody } from "~/middleware/validate.middleware";
import { loginSchema, signupSchema } from "~/schemas/auth.schemas";
import { authLimiter } from "~/middleware/rate-limit.middleware";

const router = express.Router();

// General middlewares for this group of routes
router.use(authLimiter); // Apply auth's rate-limiter

router.post("/signup", validateBody(signupSchema), AuthController.signup);
router.post("/login", validateBody(loginSchema), AuthController.login);

export default router;
