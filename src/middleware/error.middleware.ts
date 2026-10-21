import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { handlerPrismaError } from "../errors/prismaErrorHandler";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let error: AppError;

  //check prisma error is or not
  const prismaError = handlerPrismaError(err);
  if (prismaError) {
    error = prismaError;
  } else if (err instanceof AppError) {
    error = err;
  } else {
    const message = err.message || "Internal Server Error";
    error = new AppError(message, 500);
  }

  //Sever Error (500) from Production
  if(process.env.NODE_ENV === "production" && error.statusCode === 500){
    console.error("Error:",err)
  }

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && {
        stack: err.stack,
    })
  })
};
