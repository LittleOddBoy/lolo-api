import * as express from "express";
import { signup, login } from "../controllers/user.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import { loginSchema, signupSchema } from "../validation/user.schema";
import { authLimiter } from "../middleware/rateLimit.middleware";

const router = express.Router();

// rate limiter for authentication
router.use(authLimiter);

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);

export default router;
