import type { Application, NextFunction, Request, Response } from "express";

import { BaseException } from "../exceptions";

export default class ExceptionHandler {
  private static handleBaseException(err: BaseException, res: Response) {
    res.status(err.statusCode).json({
      error: {
        name: err.name,
        message: err.message,
        ...(err.details && { details: err.details }),
      },
    });
  }

  private static handleDefaultError(err: Error, res: Response) {
    console.error("Unhandled error:", err);
    res.status(500).json({
      error: {
        name: "InternalServerError",
        message: "Internal Server Error",
      },
    });
  }

  static init(app: Application) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof BaseException) {
        this.handleBaseException(err, res);
      } else {
        this.handleDefaultError(err, res);
      }
    });
  }
}
