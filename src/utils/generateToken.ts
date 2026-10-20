import type { Response } from "express";
import jwt, { type SignOptions } from "jsonwebtoken";

export const generateToken = (userId: string, res: Response) => {
  const payload = { id: userId };
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1d";

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
  }

  const options: SignOptions = {
    expiresIn: (jwtExpiresIn as SignOptions["expiresIn"]) || "1d",
  };

  const token = jwt.sign(payload, jwtSecret, options);

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Adjust based on your requirements
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  });
  return token;
};
