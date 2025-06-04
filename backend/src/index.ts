import "dotenv/config";

import type { User } from "@prisma/client";

import Application from "./lib/core/Application";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
}

const app = new Application();

app.init();
