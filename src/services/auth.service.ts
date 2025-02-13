import { initDb } from "../config/database";
import { User } from "../models/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const db = initDb();
const SECRET_KEY: string = process.env.SECRET_KEY as string;

export const signupService = async (
  username: string,
  email: string,
  password: string
): Promise<string> => {
  // Check if email already exists
  const emailExists = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);
  if (emailExists) {
    throw new Error("Email is already in use");
  }

  // Check if username already exists
  const usernameExists = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);
  if (usernameExists) {
    throw new Error("Username is already in use");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();

  // New user schema
  const newUser: User = { id: userId, username, email };

  // Insert user into DB
  db.prepare(
    "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)"
  ).run(newUser.id, newUser.username, newUser.email, hashedPassword);

  // Create token (payload excludes password)
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username, email: newUser.email },
    SECRET_KEY
  );
  return token;
};

export const loginService = async (
  email: string,
  password: string
): Promise<string> => {
  // Find user by email
  const user: User = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as User;
  if (!user) {
    throw new Error("No such user exists");
  }

  // Compare provided password with stored hash
  const passwordMatch = await bcrypt.compare(
    password,
    user.password as string
  );
  if (!passwordMatch) {
    throw new Error("Password doesn't match");
  }

  // Create token for user
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    SECRET_KEY
  );
  return token;
};
