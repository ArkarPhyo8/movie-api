import type { NextFunction, Request, Response } from "express";
import { type ZodSchema } from "zod";

export const validateRequest = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = result.error.format();
      const flattenedErrors = Object.values(formattedErrors)
        .flat()
        .filter(Boolean) // Filter out undefined values
        .map((error: any) => {
          if (error._errors) {
            return error._errors;
          }
        })
        .flat();
      const errormessage = flattenedErrors.join(", ");
      return res.status(400).json({ error: errormessage });
    }
    req.body = result.data;
    next();
  };
};
