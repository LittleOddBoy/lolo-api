import { User } from "~/src/db/entities/user.model";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY as string;

/**
 * Sign-up and create an account
 *
 * @param username - The preferred username
 * @param email - The user's email
 * @param password - The password of account
 * @returns A token based on user data
 */
export async function signupService(
  username: string,
  email: string,
  password: string
): Promise<string> {
  // Check if email already exists
  const emailExists = await User.findOne({ where: { email } });
  if (emailExists) {
    throw new Error("Email is already in use");
  }

  // Check if username already exists
  const usernameExists = await User.findOne({ where: { email } });
  if (usernameExists) {
    throw new Error("Username is already in use");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user into DB
  const newUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  // Create token
  const token = jwt.sign(
    {
      id: newUser.dataValues.id,
      username: newUser.dataValues.username,
      email: newUser.dataValues.email,
    },
    SECRET_KEY
  );
  return token;
}

/**
 * Log in to their account
 *
 * @param email - The email of user
 * @param password - The password of their account
 * @returns A new token based on user data
 */
export async function loginService(
  email: string,
  password: string
): Promise<string> {
  // Find user by email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("No such user exists");
  }

  // Compare provided password with stored hash
  const passwordMatch = await bcrypt.compare(
    password,
    user.dataValues.password as string
  );
  if (!passwordMatch) {
    throw new Error("Password doesn't match");
  }

  // Create token for user
  const token = jwt.sign(
    {
      id: user.dataValues.id,
      username: user.dataValues.username,
      email: user.dataValues.email,
    },
    SECRET_KEY
  );

  return token;
}
