import { Request, Response } from "express";
import { initDb } from "../config/database";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const db = initDb();
const SECRET_KEY: string = "what's up?";

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // check if all fields are passed
  if (!username || !email || !password) {
    res.status(400).json({
      message: "All fields (username, email and password) are required",
    });
    return;
  }

  // check if email already exists
  const emailExists = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);
  if (emailExists) {
    res.status(400).json({ message: "Email is already in use" });
    return;
  }

  // check if username already exists
  const usernameExists = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (usernameExists) {
    res.status(400).json({ message: "Username is already in use" });
    return;
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();

  // new user schema
  const newUser = { id: userId, username, email };

  // insert user into db
  db.prepare(
    "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)"
  ).run(...Object.values(newUser), hashedPassword);

  const payload = { id: userId, username, email };
  const token = jwt.sign(payload, SECRET_KEY);

  res.status(200).json({
    message: "Signed up successfully!",
    userData: { ...newUser },
    token,
  });
};

export const login = (req: Request, res: Response) => {};
