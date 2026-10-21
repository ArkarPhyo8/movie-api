import { type Request, type Response } from "express";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { AppError } from "../errors/AppError";

const getWatchListItems = catchAsync(async (req: Request, res: Response) => {
  const watchListItems = await prisma.watchListItem.findMany({
    where: {
      userId: req.user?.id as string,
    },
  });
  res.status(200).json({ watchListItems });
});

// add movie to watch list
const addToWatchList = catchAsync(async (req: Request, res: Response) => {
  const { movieId, status, rating, notes } = req.body;

  //Verify movie exists in the database
  const movieExists = await prisma.movie.findUnique({
    where: {
      id: movieId,
    },
  });

  if (!movieExists) {
    throw new AppError("Movie not found", 404);
  }

  const existingWatchListItem = await prisma.watchListItem.findUnique({
    where: {
      userId_movieId: {
        userId: req.user?.id as string,
        movieId: movieId,
      },
    },
  });

  if (existingWatchListItem) {
    throw new AppError("Movie already in watch list", 400);
  }

  const watchListItem = await prisma.watchListItem.create({
    data: {
      userId: req.user?.id as string,
      movieId: movieId,
      status: status || "PLANNED", // Default status if not provided
      rating: rating,
      notes: notes,
    },
  });

  res.status(201).json({
    message: "Movie added to watchList successfully",
    watchListItem,
  });
});

//Update Watch List Item
const updateWatchListItem = catchAsync(async (req: Request, res: Response) => {
  const { status, rating, notes } = req.body;

  //Find watch list item and verify it belongs to the authenticated user
  const watchListItem = await prisma.watchListItem.findUnique({
    where: {
      id: req.params.id as string,
    },
  });

  if (!watchListItem) {
    throw new AppError("watch list item not found", 404);
  }

  if (watchListItem.userId !== req.user?.id) {
    throw new AppError("You are not authorized to update this item", 403);
  }

  const updatedWatchListItem = await prisma.watchListItem.update({
    where: {
      id: req.params.id as string,
    },
    data: {
      status: status,
      rating: rating,
      notes: notes,
    },
  });

  res.status(200).json({
    message: "Watch list item updated successfully",
    watchListItem: updatedWatchListItem,
  });
});

const removeMovieFromWatchList = catchAsync(
  async (req: Request, res: Response) => {
    //Find watch list item  an verify it belongs to the authenticated user
    const watchListItem = await prisma.watchListItem.findUnique({
      where: {
        id: req.params.id as string,
      },
    });

    if (!watchListItem) {
      throw new AppError("Watch list item not found", 404);
    }

    if (watchListItem.userId !== req.user?.id) {
      throw new AppError("You are not authorized to delete this item", 403);
    }

    await prisma.watchListItem.delete({
      where: {
        id: req.params.id as string,
      },
    });

    res
      .status(200)
      .json({ message: "Movie removed from watchList successfully" });
  },
);

export {
  getWatchListItems,
  addToWatchList,
  updateWatchListItem,
  removeMovieFromWatchList,
};
