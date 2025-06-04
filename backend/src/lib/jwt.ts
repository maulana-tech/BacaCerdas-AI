import type { User } from "@prisma/client";

import fs from "fs";
import path from "path";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { UnauthorizedException } from "./exceptions";

declare module "jsonwebtoken" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface JwtPayload extends User {}
}

export function decodeJwt(token: string): JwtPayload {
  if (!token) {
    throw new Error("Token is required");
  }

  const pkey = getPemFile();

  try {
    const verified = jwt.verify(token, pkey, { algorithms: ["RS256"] });

    return verified as JwtPayload;
  } catch (error) {
    throw new UnauthorizedException(
      error instanceof Error ? error.message : "Invalid token",
    );
  }
}

export function generateToken(user: Omit<User, "password">) {
  const pkey = getPemFile();

  const token = jwt.sign(user, pkey, { algorithm: "RS256", expiresIn: "8w" }); // 2 months

  return token;
}

export function getPemFile() {
  const pkey = fs.readFileSync(path.resolve(__dirname, "../../key", "jwt.pem"));

  return pkey;
}
