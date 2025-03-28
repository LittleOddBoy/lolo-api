import { Response } from "express";
import { CompleteRequest } from "~/interfaces/complete-request.interface";
import { AuthService } from "~/services/v2/auth.service";

/**
 * Control and handle main auth tasks.
 */
export class AuthController {
  /**
   * Sign-up a new user
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async signup(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    try {
      const { username, email, password } = req.body;

      // Require user's specific fields
      if (!username || !email || !password) {
        res.status(400).json({
          message: "All fields (username, email and password) are required",
        });
        return;
      }

      // Sign-up a new user and generate token for it
      const token = await AuthService.signup(username, email, password);

      // Response with the generated token
      res.status(200).json({
        message: "Signed up successfully!",
        token,
      });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  /**
   * Log-in a user with their email
   * @param req {CompleteRequest} Complete, safe request
   * @param res The response
   * @returns {Promise<void>}
   */
  public static async login(
    req: CompleteRequest,
    res: Response
  ): Promise<void> {
    try {
      const { email, password } = req.body;

      // Require both email and password for log-in
      if (!email || !password) {
        res.status(400).json({
          message: "All the fields (email and password) must be passed",
        });
        return;
      }

      // Generate new token for logged-in user
      const token = await AuthService.login(email, password);

      // Response with the new generated token
      res.status(200).json({
        message: "Logged in successfully!",
        token,
      });
    } catch (error) {
      const errMsg = (error as Error).message;

      // Adjust status based on error content
      const status = errMsg.includes("doesn't match")
        ? 401
        : errMsg.includes("No such user")
        ? 404
        : 400;
      res.status(status).json({ message: errMsg });
    }
  }
}
