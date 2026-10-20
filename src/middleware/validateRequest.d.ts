import type { NextFunction, Request, Response } from "express";
import { type ZodSchema } from "zod";
export declare const validateRequest: <T>(schema: ZodSchema<T>) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=validateRequest.d.ts.map