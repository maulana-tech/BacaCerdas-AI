import {
  Router as ExpressRouter,
  type Request,
  type Application,
  type Response,
  type NextFunction,
} from "express";

import AuthRouter from "../../features/auth/AuthRouter";
import DefaultRouter from "../../features/default/DefaultRouter";
import UserRouter from "../../features/user/UserRouter";
import { NotFoundException } from "../exceptions";

export default class Router {
  static router = ExpressRouter();

  static init(app: Application) {
    app.use("/api/v1", this.router);

    this.router.use(new AuthRouter().routes);
    this.router.use(new DefaultRouter().routes);
    this.router.use(new UserRouter().routes);

    app.use((req: Request, res: Response, next: NextFunction) => {
      // Handle 404 errors
      next(new NotFoundException("Route not found"));
    });
  }
}
