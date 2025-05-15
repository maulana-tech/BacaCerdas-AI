import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

// Base route
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to BacaCerdas-AI API',
    version: '1.0.0',
  });
});

export default router;

