/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from "express";
import jwt from "../lib/jwt";
import JwtDecodedType from "../@types/JwtDecodedType";

declare global {
  namespace Express {
    interface Request {
      token?: string;
      unencryptedToken?: JwtDecodedType;
    }
  }
}

async function Auth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Invalid authorization format" });
  }

  req.token = token;

  const unencryptedToken = jwt.decrypt(token);

  if (!unencryptedToken.success) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.unencryptedToken = unencryptedToken.decoded;

  next();
}

export default Auth;
