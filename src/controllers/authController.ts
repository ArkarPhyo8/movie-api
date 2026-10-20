import { type Request, type Response } from "express";
import { prisma } from "../config/db";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  //Check if user already exists in the database
  const userExists = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  }
  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create new user in the database
  const newUser = await prisma.user.create({
    data: {
      name,
      email: email,
      password: hashedPassword,
    },
  });

  res.status(201).json({
    message: "User registered successfully",
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  //Check if user exists in the database
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ error: "Invalid email or password" });
  }
  //Generate JWT Token
  const token = generateToken(user.id, res);
  // Return success response
  res.status(200).json({
    message: "Login successful",
    user: { id: user.id, name: user.name, email: user.email },
    token,
  });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    expires: new Date(0), // Set the cookie to expire immediately
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Adjust based on your requirements
  });
  res.status(200).json({ message: "Logout successful" });
};
export { register, login, logout };
