import type { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { CompleteRequest } from "~/interfaces/complete-request.interface";

/**
 * Validate request's body based on a Zod schema
 * @param schema {ZodSchema} Target Zod schema
 * @returns Express's middleware
 */
export function validateBody(
  schema: ZodSchema
): (req: CompleteRequest | Request, res: Response, next: NextFunction) => void {
  return (
    req: CompleteRequest | Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.body);

    // Return errors if the parsing wasn't successful
    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }

    next();
  };
}

/**
 * Validate request's params based on a Zod schema
 * @param schema {ZodSchema} Target Zod schema
 * @returns Express's middleware
 */
export function validateParams(
  schema: ZodSchema
): (req: CompleteRequest | Request, res: Response, next: NextFunction) => void {
  return (
    req: CompleteRequest | Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.params);

    // Return errors if the parsing wasn't successful
    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }
    next();
  };
}

/**
 * Validate request's queries based on a Zod schema
 * @param schema {ZodSchema} Target Zod schema
 * @returns Express's middleware
 */
export function validateQuery(
  schema: ZodSchema
): (req: CompleteRequest | Request, res: Response, next: NextFunction) => void {
  return (
    req: CompleteRequest | Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = schema.safeParse(req.query);

    // Return errors if the parsing wasn't successful
    if (!result.success) {
      res.status(400).json({ error: result.error.format() });
      return;
    }
    next();
  };
}
