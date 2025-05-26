import * as z from "zod";
import { CompleteQuizz, RelatedQuizzModel } from "./index";

export const QuizzAnswerModel = z.object({
  id: z.string(),
  quizzId: z.string(),
  userId: z.string(),
  question: z.string(),
  answer: z.string(),
  isCorrect: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteQuizzAnswer extends z.infer<typeof QuizzAnswerModel> {
  Quizz: CompleteQuizz;
}

/**
 * RelatedQuizzAnswerModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuizzAnswerModel: z.ZodSchema<CompleteQuizzAnswer> = z.lazy(
  () =>
    QuizzAnswerModel.extend({
      Quizz: RelatedQuizzModel,
    }),
);
