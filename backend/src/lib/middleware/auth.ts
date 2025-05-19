import type { Request, Response, NextFunction } from "express";

// Menggunakan module augmentation daripada namespace
import "express";

// Memperluas tipe Request dari Express
declare module "express" {
  interface Request {
    user?: {
      roles?: string[];
      [key: string]: unknown; // Menggunakan unknown daripada any
    };
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Example authentication logic
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  next();
};

/**
 * @param role
 */
export const requireRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Check if the user has the required role
    if (!req.user || !req.user.roles || !req.user.roles.includes(role)) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
};
