import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import { APIRouter } from "../../lib/types/Router";
import AuthController from "./AuthController";
import validator from "../../lib/middleware/validator";
import AuthSchema from "./AuthSchema";

export default class AuthRouter implements APIRouter {
  get routes() {
    return Router()
      .post(
        "/login",
        validator.validateBody(AuthSchema.login()),
        expressAsyncHandler(new AuthController().login),
      )
      .post("/register", expressAsyncHandler(new AuthController().register));
  }
}
