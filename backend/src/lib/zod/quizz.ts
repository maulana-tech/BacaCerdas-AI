import * as z from "zod";
import {
  CompleteQuizzAnswer,
  RelatedQuizzAnswerModel,
  CompleteQuizzAttempt,
  RelatedQuizzAttemptModel,
  CompleteUserQuizz,
  RelatedUserQuizzModel,
} from "./index";

export const QuizzModel = z.object({
  id: z.string(),
  userId: z.string(),
  courseId: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteQuizz extends z.infer<typeof QuizzModel> {
  QuizzAnswer: CompleteQuizzAnswer[];
  QuizzAttempt: CompleteQuizzAttempt[];
  UserQuizz: CompleteUserQuizz[];
}

/**
 * RelatedQuizzModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuizzModel: z.ZodSchema<CompleteQuizz> = z.lazy(() =>
  QuizzModel.extend({
    QuizzAnswer: RelatedQuizzAnswerModel.array(),
    QuizzAttempt: RelatedQuizzAttemptModel.array(),
    UserQuizz: RelatedUserQuizzModel.array(),
  }),
);
