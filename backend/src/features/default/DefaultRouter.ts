import { Router } from "express";
import DefaultController from "./DefaultController";

export default class DefaultRouter {
  get routes() {
    return Router().get("/", new DefaultController().index);
  }
}
