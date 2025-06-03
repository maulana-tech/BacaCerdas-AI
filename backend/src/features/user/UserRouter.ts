import type { APIRouter } from "../../lib/types/Router";

import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

import UserController from "./UserController";

export default class UserRouter implements APIRouter {
  get routes() {
    return Router().get(
      "/users",
      expressAsyncHandler(new UserController().index),
    );
  }
}
