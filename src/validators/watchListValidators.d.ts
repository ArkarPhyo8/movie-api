import { z } from "zod";
export declare const addToWatchListSchema: z.ZodObject<{
    movieId: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        COMPLETED: "COMPLETED";
        PLANNED: "PLANNED";
        WATCHING: "WATCHING";
    }>>;
    rating: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=watchListValidators.d.ts.map