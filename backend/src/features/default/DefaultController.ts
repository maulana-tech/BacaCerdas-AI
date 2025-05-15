import type { NextFunction, Request, Response } from "express";

export default class DefaultController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  index(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({
      message: "Welcome to Baca Cerdas API",
    });
  }
}
