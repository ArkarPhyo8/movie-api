import { z } from "zod";

const movieSchema = z.object({
  title: z.string().min(1, "Movie title is required"),
  overview: z.string().optional(),
  releaseYear: z.coerce
    .number()
    .int("Release Year must be between 1 and 10 ")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10"),
  genres: z.array(z.string()),
  runtime: z.coerce
    .number()
    .int("Release Year must be between 1 and 10 ")
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10")
    .optional(),
  posterUrl: z.string().optional(),
  createdBy: z.string().min(1, "Create user is required"),
});

export { movieSchema };
