import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequestType extends Request {
  userData?: string | JwtPayload | undefined;
}
