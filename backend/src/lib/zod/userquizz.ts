import * as z from "zod";
import {
  CompleteUser,
  RelatedUserModel,
  CompleteQuizz,
  RelatedQuizzModel,
  CompleteQuizzAttempt,
  RelatedQuizzAttemptModel,
} from "./index";

export const UserQuizzModel = z.object({
  id: z.string(),
  userId: z.string(),
  quizzId: z.string(),
  highestScore: z.number().int(),
  totalAttempts: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUserQuizz extends z.infer<typeof UserQuizzModel> {
  User: CompleteUser;
  Quizz: CompleteQuizz;
  QuizzAttempt: CompleteQuizzAttempt[];
}

/**
 * RelatedUserQuizzModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserQuizzModel: z.ZodSchema<CompleteUserQuizz> = z.lazy(
  () =>
    UserQuizzModel.extend({
      User: RelatedUserModel,
      Quizz: RelatedQuizzModel,
      QuizzAttempt: RelatedQuizzAttemptModel.array(),
    }),
);
