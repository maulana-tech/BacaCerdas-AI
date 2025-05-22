import express from "express";

import Middleware from "./Middleware";
import Router from "./Router";
import ExceptionHandler from "./ExceptionHandler";

import Logger from "../middleware/logger";

export default class Application {
  static app = express();
  static appname = "Baca Cerdas";
  static port = process.env.PORT || 3030;

  constructor() {
    /** order matter */
    Middleware.init(Application.app);
    Router.init(Application.app);
    ExceptionHandler.init(Application.app);
  }

  init() {
    Application.app.listen(Application.port, () =>
      Logger.log(`${Application.appname} is running at ${Application.port}`),
    );
  }
}
