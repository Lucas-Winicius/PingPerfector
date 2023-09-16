import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

async function ErrorHandler(
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(500).send("Something broke!");
  next();
}

export default ErrorHandler;
