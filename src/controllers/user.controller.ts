import { Request, Response } from "express";
import { initDb } from "../config/database";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

const db = initDb();
const SECRET_KEY: string = process.env.SECRET_KEY as string;

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
  if (!emailExists) {
    res.status(400).json({ message: "Email is already in use" });
    return;
  }

  // check if username already exists
  const usernameExists = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);
  if (!usernameExists) {
    res.status(400).json({ message: "Username is already in use" });
    return;
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();

  // new user schema
  const newUser: User = { id: userId, username, email };

  // insert user into db
  db.prepare(
    "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)"
  ).run(...Object.values(newUser), hashedPassword);

  // create token
  const payload: User = { id: userId, username, email };
  const token = jwt.sign(payload, SECRET_KEY);

  res.status(200).json({
    message: "Signed up successfully!",
    token,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // ensure everything is passed
  if (!email || !password) {
    res
      .status(400)
      .json({ message: "All the fields (email and password) must be passed" });
    return;
  }

  // find user
  const user: User = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email) as User;
  if (!user) {
    res.status(404).json({ message: "No such user does exists" });
    return;
  }

  // compare password
  const passwordMatch = await bcrypt.compare(password, user.password as string);
  if (!passwordMatch) {
    res.status(401).json({ message: "Password doesn't match" });
    return;
  }

  // re-create token for user
  const payload = { id: user.id, username: user.username, email };
  const token = jwt.sign(payload, SECRET_KEY);

  res.status(200).json({ message: "Logged in successfully!", token });
};
