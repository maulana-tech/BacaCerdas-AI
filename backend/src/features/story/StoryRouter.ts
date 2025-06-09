import type { APIRouter } from "../../lib/types/Router";

import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import { Role } from "@prisma/client";
import StoryController from "./StoryController";
import StorySchema from "./StorySchema";
import validator from "../../lib/middleware/validator";
import { isUserAllowed } from "../../lib/middleware/auth";

export default class StoryRouter implements APIRouter {
  get routes() {
    return Router()
      .get("/stories", expressAsyncHandler(new StoryController().index))
      .post(
        "/stories",
        [
          isUserAllowed([Role.ROOT, Role.TEACHER]),
          validator.validateBody(StorySchema.store()),
        ],
        expressAsyncHandler(new StoryController().store),
      )
      .get("/stories/:id", expressAsyncHandler(new StoryController().show))
      .put(
        "/stories/:id",
        [
          isUserAllowed([Role.ROOT, Role.TEACHER]),
          validator.validateBody(StorySchema.store()),
        ],
        expressAsyncHandler(new StoryController().update),
      )
      .delete(
        "/stories/:id",
        [
          isUserAllowed([Role.ROOT, Role.TEACHER]),
        ],
        expressAsyncHandler(new StoryController().destroy),
      );
  }
}