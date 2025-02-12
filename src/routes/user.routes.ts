import * as express from "express";
import { signup, login } from "../controllers/user.controller";
import { validate } from "../middleware/validation.middleware";
import { loginSchema, signupSchema } from "../validation/user.schema";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);

export default router;
