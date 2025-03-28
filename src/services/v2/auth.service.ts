import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { UserRepository } from "~/repositories/user.repository";

dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY as string;

/**
 * Services for authentication
 */
export class AuthService {
  /**
   * Sign-up and create an account
   *
   * @param username - The preferred username
   * @param email - The user's email
   * @param password - The password of account
   * @returns A token based on user data
   */
  public static async signup(
    username: string,
    email: string,
    password: string
  ): Promise<string> {
    // Check if email already exists in database
    const emailExists = await UserRepository.checkEmailExists(email);
    if (emailExists) {
      throw new Error("Email is already in use");
    }

    // Check if username already exists in database
    const usernameExists = await UserRepository.checkUsernameExists(username);
    if (usernameExists) {
      throw new Error("Username is already in use");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const newUser = await UserRepository.createNewUser(
      username,
      email,
      hashedPassword
    );

    // Generate and return a token
    const token = jwt.sign(
      {
        id: newUser.generatedMaps[0].id,
        username,
        email,
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
  public static async login(email: string, password: string): Promise<string> {
    // Find user with the specified email
    const user = await UserRepository.findByEmail(email);
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

    // Generate and return token for user
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      SECRET_KEY
    );

    return token;
  }
}
