import "dotenv/config";
import express, { type Express } from "express";
import { config } from "dotenv";
import cors from "cors";

//Import Routes
import movieRoutes from "./routes/movieRoutes";
import authRoutes from "./routes/authRoutes";
import watchListRoutes from "./routes/watchListRoutes";

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

config();

import { connectToDatabase, disconnectFromDatabase } from "./config/db";
import { authMiddleware } from "./middleware/authMiddleware";
import { notFoundHandler } from "./middleware/notFound.middleware";
import { globalErrorHandler } from "./middleware/error.middleware";

connectToDatabase();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routes
app.use("/auth", authRoutes);
app.use(authMiddleware);
app.use("/movies", movieRoutes);
app.use("/watch-list", watchListRoutes);

//Not Found Middleware
app.use(notFoundHandler);

//Global Error Handler
app.use(globalErrorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  server.close(() => {
    disconnectFromDatabase().finally(() => {
      process.exit(1); // Exit the process with an error code
    });
  });
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  disconnectFromDatabase().finally(() => {
    process.exit(1); // Exit the process with an error code
  });
});

process.on("SIGINT", async () => {
  console.log(
    "SIGINT signal received: closing server and disconnecting from database.",
  );
  server.close(async () => {
    await disconnectFromDatabase();
    process.exit(0); // Exit the process gracefully
  });
});
