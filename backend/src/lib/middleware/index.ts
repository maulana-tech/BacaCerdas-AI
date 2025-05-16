import type { Request, Response, NextFunction } from "express";

import Logger from "./logger";

// Example middleware for authentication
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Authentication logic would go here
  // For example, validating JWT tokens

  // If authenticated, proceed to the next middleware/route handler
  next();

  // If not authenticated, return an error
  // res.status(401).json({ error: 'Unauthorized' });
};

// Example middleware for logging
export const logger =
  () => (req: Request, res: Response, next: NextFunction) => {
    Logger.log(`${req.method} ${req.url}`);
    next();
  };
