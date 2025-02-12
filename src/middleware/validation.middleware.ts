import { NextFunction, Response } from "express";
import { ZodSchema } from "zod";
import { AuthenticatedRequest } from "../models/authenticatedRequest.model";

export const validate =
  (schema: ZodSchema) =>
  (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.errors });
      return;
    }
    next();
  };
