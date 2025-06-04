import type { APIRouter } from "../../lib/types/Router";

import { Router } from "express";
import { Role } from "@prisma/client";

import DefaultController from "./DefaultController";
import { isUserAllowed } from "../../lib/middleware/auth";

export default class DefaultRouter implements APIRouter {
  get routes() {
    return Router()
      .get("/", new DefaultController().index)
      .get(
        "/student",
        isUserAllowed([Role.STUDENT]),
        new DefaultController().index,
      )
      .get(
        "/teacher",
        isUserAllowed([Role.TEACHER]),
        new DefaultController().index,
      );
  }
}
