// Lokasi: backend/src/features/summary/SummaryInterfaces.ts

import { type Request } from "express";

// Tipe AuthenticatedRequest tidak lagi diperlukan karena Request global sudah punya 'user'

export interface CreateSummaryRequest extends Request {
  body: {
    data: {
      courseId: string;
      summary: string;
    };
  };
}

export interface UpdateSummaryRequest extends Request {
  body: {
    data: {
      summary?: string;
      rating?: number;
      feedback?: string;
    };
  };
  params: {
    id: string;
  };
}
