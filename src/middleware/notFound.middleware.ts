import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
};
