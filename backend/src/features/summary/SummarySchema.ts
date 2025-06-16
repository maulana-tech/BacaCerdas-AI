import { z } from "zod";

export const CreateSummarySchema = z.object({
  body: z.object({
    data: z.object({
      courseId: z.string({
        required_error: "Course ID is required",
      }),
      summary: z
        .string({
          required_error: "Summary content is required",
        })
        .min(1, "Summary content cannot be empty"),
    }),
  }),
});

export const UpdateSummarySchema = z.object({
  body: z.object({
    data: z.object({
      summary: z.string().min(1, "Summary content cannot be empty").optional(),
      rating: z.number().min(1).max(5).optional(),
      feedback: z.string().optional(),
    }),
  }),
});
