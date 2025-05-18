import type { Router } from "express";

export interface APIRouter {
  get routes(): Router;
}
