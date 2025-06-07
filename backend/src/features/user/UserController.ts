import type { NextFunction, Request, Response } from "express";
import UserService from "./UserService";

/**
 * Controller follows the same pattern as laravel controllers convention:
 * https://laravel.com/docs/12.x/controllers#actions-handled-by-resource-controllers
 * */
export default class UserController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async index(req: Request, res: Response, next: NextFunction) {
    const users = await new UserService().getAllUsers();

    res.status(200).json(users);
  }
}
