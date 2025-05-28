import type { Role } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface JWTPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export function decodeJwt(token: string): JWTPayload {
  if (!token) {
    throw new Error("Token is required");
  }

  const decoded = jwt.decode(token);

  if (!decoded || typeof decoded !== "object") {
    throw new Error("Invalid JWT token");
  }

  return decoded as JWTPayload;
}
