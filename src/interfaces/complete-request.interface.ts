import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CompleteRequest extends Request {
  userData?: string | JwtPayload | undefined;
  apiVersion?: string | number;
}
