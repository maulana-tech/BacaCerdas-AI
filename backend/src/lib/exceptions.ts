import { ZodError } from "zod";
import Logger from "./middleware/logger";

export class BaseException extends Error {
  constructor(
    public readonly name: string,
    public readonly statusCode: number,
    public readonly message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Logger.error(`${name}: ${message}`);
  }
}

export class UnauthorizedException extends BaseException {
  constructor(message: string) {
    super("UnauthorizedException", 401, message);
  }
}

export class ValidationException extends BaseException {
  constructor(error: ZodError) {
    super("ValidationException", 422, "Validation failed", {
      errors: error.errors.map((err) => ({
        field: err.path.join("."),
        message: err.message,
        code: err.code,
      })),
    });
  }
}
