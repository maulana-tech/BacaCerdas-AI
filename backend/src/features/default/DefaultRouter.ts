import { Router } from "express";
import type { APIRouter } from "../../lib/types/Router";
import DefaultController from "./DefaultController";

export default class DefaultRouter implements APIRouter {
  get routes() {
    return Router().get("/", new DefaultController().index);
  }
}
