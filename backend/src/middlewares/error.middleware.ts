import { Request, Response, NextFunction } from "express";

export function handleError(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  console.error(err);
  res.status(status).json({
    success: false,
    message,
  });
}
