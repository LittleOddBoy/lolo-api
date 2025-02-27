import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { AuthenticatedRequestType } from "../interfaces/authenticatedRequest.interface";

export const validateParams =
  (schema: ZodSchema) =>
  (
    req: AuthenticatedRequestType | Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.params);
    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }
    next();
  };
