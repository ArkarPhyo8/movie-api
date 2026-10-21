import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/db";
import { AppError } from "../errors/AppError";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
    } catch (error) {
      throw new AppError("Invalid token", 401);
    }
  } else if (req.cookies && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new AppError("No token provided", 401);
  }

  try {
    //Verify token and extract user Id
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    const user = await prisma.user.findUnique({
      where: {
        id: (decoded as { id: string }).id,
      },
    });
    if (!user) {
       throw new AppError( "User not found", 401);
    }
    req.user = user;
  } catch (error) {
    console.error("Error occurred while verifying token:", error);
     throw new AppError("Invalid token", 401);
  }

  next();
};
