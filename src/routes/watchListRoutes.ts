import express from "express";
import {
  addToWatchList,
  getWatchListItems,
  removeMovieFromWatchList,
  updateWatchListItem,
} from "../controllers/watchListController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/validateRequest";
import { addToWatchListSchema } from "../validators/watchListValidators";

const router = express.Router();

router.get("/", getWatchListItems);
router.use(authMiddleware);
router.post("/", validateRequest(addToWatchListSchema), addToWatchList);
router.put("/:id", updateWatchListItem);
router.delete("/:id", removeMovieFromWatchList);

export default router;
