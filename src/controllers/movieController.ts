import { type Request, type Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../errors/AppError";

const getAllMovie = catchAsync(async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany();

  if (!movies) {
    throw new AppError("No movies found", 404);
  }

  res.status(200).json({
    message: "Movies retrieved successfully",
    movies: movies,
  });
});

export { getAllMovie };
