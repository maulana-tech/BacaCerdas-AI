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

    res.status(200).json(stories);
  }

  async store(
    req: Request<
      Record<string, never>,
      Record<string, never>,
      StoryStoreSchema
    >,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) {
    const story = await new StoryService().postStory(req.body);

    res.status(201).json(story);
  }

  async show(
    req: Request<{ id: string }>,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) {
    const story = await new StoryService().getStoryById(req.params.id);

    res.status(200).json(story);
  }

  async update(
    req: Request<{ id: string }, Record<string, never>, StoryStoreSchema>,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) {
    const story = await new StoryService().updateStory(req.params.id, req.body);

    res.status(200).json(story);
  }

  async destroy(
    req: Request<{ id: string }>,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ) {
    await new StoryService().deleteStory(req.params.id);

    res.status(204).send();
  }
}
