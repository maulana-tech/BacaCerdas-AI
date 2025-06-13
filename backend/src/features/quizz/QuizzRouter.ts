import type { APIRouter } from "../../lib/types/Router";
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { Role } from "@prisma/client";

import QuizzSchema from "./QuizzSchema";
import validator from "../../lib/middleware/validator";
import { isUserAllowed } from "../../lib/middleware/auth";
import QuizzController from "./QuizzController";

export default class QuizzRouter implements APIRouter {
  get routes() {
    return Router()
      .get("/quizzes", expressAsyncHandler(new QuizzController().index))
      .post(
        "/quizzes",
        [
          isUserAllowed([Role.TEACHER]),
          validator.validateBody(QuizzSchema.store()),
        ],
        expressAsyncHandler(new QuizzController().store),
      )
      .get("/quizzes/:id", expressAsyncHandler(new QuizzController().show))
      .put(
        "/quizzes/:id",
        [
          isUserAllowed([Role.TEACHER]),
          validator.validateBody(QuizzSchema.store()),
        ],
        expressAsyncHandler(new QuizzController().update),
      )
      .delete(
        "/quizzes/:id",
        isUserAllowed([Role.TEACHER]),
        expressAsyncHandler(new QuizzController().destroy),
      );
  }
}
