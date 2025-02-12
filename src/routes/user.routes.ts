import * as express from "express";
import { signup, login } from "../controllers/user.controller";
import { validateBody } from "../middleware/validateBody.middleware";
import { loginSchema, signupSchema } from "../validation/user.schema";

const router = express.Router();

router.post("/signup", validateBody(signupSchema), signup);
router.post("/login", validateBody(loginSchema), login);

export default router;
