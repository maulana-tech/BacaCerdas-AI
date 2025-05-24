import type { NextFunction, Request, Response } from "express";
import AuthService from "./AuthService";
// import UserService from "../user/UserService";

/**
 * Controller follows the same pattern as laravel controllers convention:
 * https://laravel.com/docs/12.x/controllers#actions-handled-by-resource-controllers
 *
 * ! Important: this is a special controller for authentication,
 * so it not follow the same pattern as other controllers.
 * */
export default class AuthController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async login(req: Request, res: Response, next: NextFunction) {
    const user = await new AuthService().authenticateUser(req.body.data);

    res.status(200).json({
      data: user,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async register(req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, acceptTerms, ...data } = req.body.data;
    const user = await new AuthService().registerUser(data);

    res.status(201).json({
      data: user,
    });
  }
}
