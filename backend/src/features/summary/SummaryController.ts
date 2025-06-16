import type { NextFunction, Request, Response } from "express";
import SummaryService from "./SummaryService";

export default class SummaryController {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSummaries(req: Request, res: Response, _next: NextFunction) {
    const response = await new SummaryService().find();
    res.status(200).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getSummaryById(req: Request, res: Response, _next: NextFunction) {
    const response = await new SummaryService().findOne(req.params.id);
    res.status(200).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async createSummary(req: Request, res: Response, _next: NextFunction) {
    const payload = { ...req.body.data, userId: req.user?.id ?? null };
    const response = await new SummaryService().create(payload);
    res.status(201).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateSummary(req: Request, res: Response, _next: NextFunction) {
    const response = await new SummaryService().update(
      req.params.id,
      req.body.data,
    );
    res.status(200).json(response);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteSummary(req: Request, res: Response, _next: NextFunction) {
    const response = await new SummaryService().delete(req.params.id);
    res.status(200).json(response);
  }
}
