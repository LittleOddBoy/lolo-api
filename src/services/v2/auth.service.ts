import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { db } from "~/db";
import { NewUser, User, users } from "~/db/schema";
import { eq } from "drizzle-orm";

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
    const emailExists = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.email, email));
    if (emailExists) {
      throw new Error("Email is already in use");
    }

    // Check if username already exists in database
    // const usernameExists = await UserRepository.checkUsernameExists(username);
    const usernameExists = await db
      .select({ username: users.username })
      .from(users)
      .where(eq(users.username, username));
    if (usernameExists) {
      throw new Error("Username is already in use");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    // const newUser = await UserRepository.createNewUser(
    //   username,
    //   email,
    //   hashedPassword
    // );
    const newUser = await db
      .insert(users)
      .values({ username, email, password: hashedPassword });

    const newUserData = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // Generate and return a token
    const token = jwt.sign(
      {
        id: newUserData[0].id,
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
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
    if (!user) {
      throw new Error("No such user exists");
    }

    // Compare provided password with stored hash
    const passwordMatch = await bcrypt.compare(
      password,
      user[0].password as string
    );
    if (!passwordMatch) {
      throw new Error("Password doesn't match");
    }

    // Generate and return token for user
    const token = jwt.sign(
      {
        id: user[0].id,
        username: user[0].username,
        email: user[0].email,
      },
      SECRET_KEY
    );

    return token;
  }
}
