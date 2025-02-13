import { z } from "zod";
import { sanitize } from "../utils";

const usernameRegex = /^@[a-zA-Z0-9_.]+$/;

export const signupSchema = z.object({
  username: z
    .string()
    .regex(
      usernameRegex,
      "Invalid username format! The username shall not include special characters except dot (.) and/or underscore (_) and must starts with at-sign (@)"
    )
    .min(
      4,
      "The username must be at least 4 characters (including at-sigh) long!"
    )
    .max(
      35,
      "The username cannot be longer than 35 characters (including at-sign)"
    )
    .transform(sanitize),
  email: z.string().email().transform(sanitize),
  password: z
    .string()
    .min(6, "The password must at least be 8 characters long!")
    .transform(sanitize),
});

export const loginSchema = signupSchema.pick({ email: true, password: true });

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
