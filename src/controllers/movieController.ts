import { type Request, type Response } from "express";
import { prisma } from "../config/db";

const getAllMovie = async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany();

  if (!movies) {
    return res.status(404).json({ error: "No movies found" });
  }

  res.status(200).json({
    message: "Movies retrieved successfully",
    movies: movies,
  });
};

export { getAllMovie };
