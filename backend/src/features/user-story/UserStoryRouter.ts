import expressAsyncHandler from "express-async-handler";
import type { APIRouter } from "../../lib/types/Router";

import { Router } from "express";
import { Role } from "@prisma/client";
import UserStoryController from "./UserStoryController";
import { isUserAllowed } from "../../lib/middleware/auth";

export default class UserStoryRouter implements APIRouter {
  get routes() {
    return Router().get(
      "/users/stories",
      isUserAllowed([Role.TEACHER]),
      expressAsyncHandler(new UserStoryController().index),
    );
  }
}
