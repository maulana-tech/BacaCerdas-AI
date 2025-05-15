import { Router as ExpressRouter, type Application } from "express";
import DefaultRouter from "../../features/default/DefaultRouter";

export default class Router {
  static router = ExpressRouter();

  static init(app: Application) {
    app.use("/api/v1", this.router);

    this.router.use(new DefaultRouter().routes);
  }
}
