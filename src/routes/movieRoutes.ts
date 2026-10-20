import express, { type Request, type Response } from "express";
import { getAllMovie } from "../controllers/movieController";

const router = express.Router();

router.get("/", getAllMovie);

router.post("/", (req: Request, res: Response) => {
  // Logic to create a new movie
  res.json({ message: "Movie created successfully!" });
});

router.put("/", (req: Request, res: Response) => {
  const { id } = req.params;
  // Logic to update a movie with the given id
  res.json({ message: `Movie with id ${id} updated successfully!` });
});

router.delete("/", (req: Request, res: Response) => {
  const { id } = req.params;
  // Logic to delete a movie with the given id
  res.json({ message: `Movie with id ${id} deleted successfully!` });
});

export default router;
