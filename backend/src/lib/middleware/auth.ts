import type { Request, Response, NextFunction } from "express";
import type { Role } from "@prisma/client";

import { decodeJwt } from "../jwt";
import { UnauthorizedException } from "../exceptions";

export function isUserAllowed(role: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = getTokenFromHeaders(req);

    if (!token) {
      return next(
        new UnauthorizedException(
          "You're not authorized to access this resource",
        ),
      );
    }

    const getRoleFromToken = decodeJwt(token);

    if (!role.includes(getRoleFromToken.role)) {
      return next(
        new UnauthorizedException(
          "You're not authorized to access this resource",
        ),
      );
    }

    return next();
  };
}

function getTokenFromHeaders(req: Request) {
  const authHeader =
    req.headers.authorization ||
    req.headers.Authorization ||
    req.headers["x-auth-token"];

  /**
   * Check if the authHeader is an array, which can happen in some cases
   * !important: This is not a standard behavior, and yet tested
   * Be careful with this, as it may not work in all environments
   */
  if (Array.isArray(authHeader)) {
    return authHeader[1];
  }

  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
}
