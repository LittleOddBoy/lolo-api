import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { CompleteRequest } from "~/interfaces/complete-request.interface";

export const authorizeMiddleware = async (
  req: CompleteRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // check if the token doesn't exist in the request
  if (!token) {
    res
      .status(403)
      .json({ message: "You don't have the permission to do so!" });
    return;
  }

  jwt.verify(token, process.env.SECRET_KEY as string, (err, userData) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    req.userData = userData;
    next();
  });
};
