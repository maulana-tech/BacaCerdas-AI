import type { NextFunction, Request, Response } from "express";
import StoryService from "./StoryService";
import { StoryStoreSchema } from "./StorySchema";

/**
 * Controller follows the same pattern as laravel controllers convention:
 * https://laravel.com/docs/12.x/controllers#actions-handled-by-resource-controllers
 *
 * ! Important: this is a special controller for authentication,
 * so it not follow the same pattern as other controllers.
 * */
export default class StoryController {
  async index(
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) {
    const stories = await new StoryService().getAllStories();

    res.status(200).json({
      data: stories,
    });
  }

  async store(
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    req: Request<{}, {}, StoryStoreSchema>,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) {
    const story = await new StoryService().postStory(req.body);

    res.status(201).json({
      data: story,
    });
  }
}
