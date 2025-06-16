export type CreateSummaryDTO = {
  courseId: string;
  userId: string;
  summary: string;
};

export type UpdateSummaryDTO = {
  summary?: string;
  rating?: number;
  feedback?: string;
};
