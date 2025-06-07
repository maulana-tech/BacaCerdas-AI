import type { NextFunction, Request, Response } from "express";
import UserStoryService from "./UserStoryService";

/**
 * Controller follows the same pattern as laravel controllers convention:
 * https://laravel.com/docs/12.x/controllers#actions-handled-by-resource-controllers
 *
 * ! Important: this is a special controller for authentication,
 * so it not follow the same pattern as other controllers.
 * */
export default class UserStoryController {
  async index(
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) {
    const user = req.user!;

    const stories = await new UserStoryService().getAllUserStories(user.id);

    res.status(200).json(stories);
  }
}
