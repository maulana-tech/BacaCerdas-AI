import type { NextFunction, Request, Response } from "express";
import QuizzService from "./QuizzService";

export default class QuizzController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async index(req: Request, res: Response, _next: NextFunction) {
    const response = await new QuizzService().getAllQuizzes();
    res.status(200).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async store(req: Request, res: Response, _next: NextFunction) {
    const response = await new QuizzService().createQuiz(req.body.data);
    res.status(201).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async show(req: Request, res: Response, _next: NextFunction) {
    const response = await new QuizzService().getQuizById(req.params.id);
    res.status(200).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(req: Request, res: Response, _next: NextFunction) {
    const response = await new QuizzService().updateQuiz(
      req.params.id,
      req.body.data,
    );
    res.status(200).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async destroy(req: Request, res: Response, _next: NextFunction) {
    const response = await new QuizzService().deleteQuiz(req.params.id);
    res.status(200).json(response);
  }
}
