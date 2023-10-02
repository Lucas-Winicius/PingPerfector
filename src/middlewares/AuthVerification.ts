import { NextFunction, Request, Response } from "express";
import jwt from "../lib/jwt";
import responsePattern from "../lib/responsePattern";

async function AuthVerification(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token);

  if (!decoded) {
    const response = responsePattern({
      mode: "error",
      status: 401,
      message:
        "Oops! Something went wrong. It appears the token you provided is invalid. Verify it and try again.",
    });

    return res.status(response.status).json(response);
  }

  req.body.decodedToken = decoded;

  next();
}

export default AuthVerification;
