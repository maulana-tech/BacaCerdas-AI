import type { Request, Response, NextFunction } from "express";

import Logger from "./logger";

// Example middleware for logging
export const logger =
  () => (req: Request, res: Response, next: NextFunction) => {
    Logger.log(`${req.method} ${req.url}`);
    next();
  };
