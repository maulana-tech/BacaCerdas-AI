import { z } from "zod";

export default class QuizzSchema {
  static store() {
    return z.object({
      data: z.object({
        title: z.string(),
        courseId: z.string(),
        description: z.string().optional(),
        content: z.array(
          z.object({
            question: z.string(),
            type: z.enum(["multiple_choice", "essay"]),
            options: z
              .array(
                z.object({
                  id: z.number(),
                  text: z.string(),
                  is_correct: z.boolean(),
                }),
              )
              .optional(),
            correct_answer: z.union([z.string(), z.number()]).optional(),
            explanation: z.string().optional(),
            points: z.number().optional(),
          }),
        ),
      }),
    });
  }
}
