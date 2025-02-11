import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userData?: string | JwtPayload | undefined;
}
