import { NextFunction, Request, Response } from "express";
import { type ZodSchema } from "zod";
import { ValidationException } from "../exceptions";

/**
 * @description - Middleware for validating request body, query, and params using Zod
 * @param schema
 * @returns
 */
const validator = {
   
  validateBody:
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
      const result = schema.safeParse(req.body);

      if (!result.success) next(new ValidationException(result.error));

      next();
    },
};

export default validator;
