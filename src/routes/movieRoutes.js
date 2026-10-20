import express, {} from "express";
import { getAllMovie } from "../controllers/movieController";
const router = express.Router();
router.get("/", getAllMovie);
router.post("/", (req, res) => {
    // Logic to create a new movie
    res.json({ message: "Movie created successfully!" });
});
router.put("/", (req, res) => {
    const { id } = req.params;
    // Logic to update a movie with the given id
    res.json({ message: `Movie with id ${id} updated successfully!` });
});
router.delete("/", (req, res) => {
    const { id } = req.params;
    // Logic to delete a movie with the given id
    res.json({ message: `Movie with id ${id} deleted successfully!` });
});
export default router;
//# sourceMappingURL=movieRoutes.js.map