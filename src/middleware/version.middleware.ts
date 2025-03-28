import { Request, Response, NextFunction } from "express";
import { CompleteRequest } from "~/interfaces/complete-request.interface";

const ALLOWED_VERSIONS = ["v1", "v2"];

export function versionMiddleware(
  req: CompleteRequest,
  res: Response,
  next: NextFunction
) {
  // Get requested version via params
  const { version } = req.params;

  // Forbid version 1, because I don't have the code:))
  if (version == "v1") {
    res
      .status(400)
      .json({ error: "Well, I forgot to include the code for v1:))" });
    return;
  }

  // Forbid invalid versions
  if (!ALLOWED_VERSIONS.includes(version)) {
    res.status(400).json({ error: "Invalid API version" });
    return;
  }

  // Inject the api version to req
  req.apiVersion = version;

  next();
}
