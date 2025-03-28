import { Request, Response } from "express";
import { AuthService } from "~/services/v2/auth.service";

export class AuthController {
  public static async signup(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        res.status(400).json({
          message: "All fields (username, email and password) are required",
        });
        return;
      }

      const token = await AuthService.signup(username, email, password);
      res.status(200).json({
        message: "Signed up successfully!",
        token,
      });
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({
          message: "All the fields (email and password) must be passed",
        });
        return;
      }

      const token = await AuthService.login(email, password);
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
