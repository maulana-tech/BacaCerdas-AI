import express from "express";

import Middleware from "./Middleware";
import Router from "./Router";

import Logger from "../middleware/logger";

export default class Application {
  static app = express();
  static appname = "Baca Cerdas";
  static port = process.env.PORT || 3000;

  constructor() {
    Middleware.init(Application.app);
    Router.init(Application.app);
  }

  init() {
    Application.app.listen(Application.port, () =>
      Logger.log(`${Application.appname} is running at ${Application.port}`),
    );
  }
}
