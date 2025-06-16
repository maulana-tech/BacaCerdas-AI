import type { APIRouter } from "../../lib/types/Router";
import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import SummaryController from "./SummaryController";
import { CreateSummarySchema, UpdateSummarySchema } from "./SummarySchema";
import validator from "../../lib/middleware/validator";

import { isUserAllowed } from "../../lib/middleware/auth";
import { Role } from "@prisma/client";

export default class SummaryRouter implements APIRouter {
  get routes() {
    return Router()
      .get(
        "/summaries",
        isUserAllowed([Role.STUDENT, Role.TEACHER]),
        expressAsyncHandler(new SummaryController().getSummaries),
      )
      .get(
        "/summaries/:id",
        isUserAllowed([Role.STUDENT, Role.TEACHER]),
        expressAsyncHandler(new SummaryController().getSummaryById),
      )
      .post(
        "/summaries",
        [
          isUserAllowed([Role.STUDENT, Role.TEACHER]),
          validator.validateBody(CreateSummarySchema),
        ],
        expressAsyncHandler(new SummaryController().createSummary),
      )
      .patch(
        "/summaries/:id",
        [
          isUserAllowed([Role.STUDENT, Role.TEACHER]),
          validator.validateBody(UpdateSummarySchema),
        ],
        expressAsyncHandler(new SummaryController().updateSummary),
      )
      .delete(
        "/summaries/:id",
        isUserAllowed([Role.STUDENT, Role.TEACHER]),
        expressAsyncHandler(new SummaryController().deleteSummary),
      );
  }
}
