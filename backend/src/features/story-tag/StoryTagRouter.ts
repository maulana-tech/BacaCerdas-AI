import type { APIRouter } from "../../lib/types/Router";

import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import StoryTagController from "./StoryTagController";

export default class StoryTagRouter implements APIRouter {
  get routes() {
    return Router().get(
      "/story-tags",
      expressAsyncHandler(new StoryTagController().index),
    );
  }
}
