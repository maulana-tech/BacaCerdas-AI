import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import { APIRouter } from "../../lib/types/Router";
import AuthController from "./AuthController";

export default class AuthRouter implements APIRouter {
  get routes() {
    return Router().post(
      "/register",
      expressAsyncHandler(new AuthController().register),
    );
  }
}
