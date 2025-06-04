import type { NextFunction, Request, Response } from "express";
import StoryTagService from "./StoryTagService";

/**
 * Controller follows the same pattern as laravel controllers convention:
 * https://laravel.com/docs/12.x/controllers#actions-handled-by-resource-controllers
 *
 * ! Important: this is a special controller for authentication,
 * so it not follow the same pattern as other controllers.
 * */
export default class StoryTagController {
  async index(
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) {
    const storyTags = await new StoryTagService().getAllStoryTags();

    res.status(200).json({
      data: storyTags,
    });
  }
}
