import {} from "express";
import { prisma } from "../config/db";
const getWatchListItems = async (req, res) => {
    try {
        const watchListItems = await prisma.watchListItem.findMany({
            where: {
                userId: req.user?.id,
            },
        });
        res.status(200).json({ watchListItems });
    }
    catch (error) {
        console.error("Error occurred while fetching watch list items:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
const addToWatchList = async (req, res) => {
    const { movieId, status, rating, notes } = req.body;
    //Verify movie exists in the database
    const movieExists = await prisma.movie.findUnique({
        where: {
            id: movieId,
        },
    });
    if (!movieExists) {
        return res.status(404).json({ error: "Movie not found" });
    }
    const existingWatchListItem = await prisma.watchListItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.user?.id,
                movieId: movieId,
            },
        },
    });
    if (existingWatchListItem) {
        return res.status(400).json({ error: "Movie already in watchList" });
    }
    const watchListItem = await prisma.watchListItem.create({
        data: {
            userId: req.user?.id,
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
};
const updateWatchListItem = async (req, res) => {
    const { status, rating, notes } = req.body;
    //Find watch list item and verify it belongs to the authenticated user
    const watchListItem = await prisma.watchListItem.findUnique({
        where: {
            id: req.params.id,
        },
    });
    if (!watchListItem) {
        return res.status(404).json({ error: "Watch list item not found" });
    }
    if (watchListItem.userId !== req.user?.id) {
        return res
            .status(403)
            .json({ error: "You are not authorized to update this item" });
    }
    const updatedWatchListItem = await prisma.watchListItem.update({
        where: {
            id: req.params.id,
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
};
const removeMovieFromWatchList = async (req, res) => {
    //Find watch list item  an verify it belongs to the authenticated user
    const watchListItem = await prisma.watchListItem.findUnique({
        where: {
            id: req.params.id,
        },
    });
    if (!watchListItem) {
        return res.status(404).json({ error: "Watch list item not found" });
    }
    if (watchListItem.userId !== req.user?.id) {
        return res
            .status(403)
            .json({ error: "You are not authorized to delete this item" });
    }
    await prisma.watchListItem.delete({
        where: {
            id: req.params.id,
        },
    });
    res
        .status(200)
        .json({ message: "Movie removed from watchList successfully" });
};
export { getWatchListItems, addToWatchList, updateWatchListItem, removeMovieFromWatchList };
//# sourceMappingURL=watchListController.js.map