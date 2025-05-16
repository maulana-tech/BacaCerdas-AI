import type { Application } from "express";

import express from "express";

import cors from "cors";
import helmet from "helmet";
import { logger } from "../middleware";

export default class Middleware {
  static init(app: Application) {
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(logger());
  }
}
