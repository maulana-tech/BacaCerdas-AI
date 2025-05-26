import * as z from "zod";
import {
  CompleteUserQuizz,
  RelatedUserQuizzModel,
  CompleteQuizz,
  RelatedQuizzModel,
} from "./index";

// Helper schema for JSON fields
type Literal = boolean | number | string;
type Json = Literal | { [key: string]: Json } | Json[];
const literalSchema = z.union([z.string(), z.number(), z.boolean()]);
const jsonSchema: z.ZodSchema<Json> = z.lazy(() =>
  z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]),
);

export const QuizzAttemptModel = z.object({
  id: z.string(),
  userId: z.string(),
  quizzId: z.string(),
  score: z.number().int(),
  attempt: z.number().int(),
  timeTaken: z.number().int(),
  answers: jsonSchema,
  feedback: z.string().nullish(),
  rating: z.number().int().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteQuizzAttempt
  extends z.infer<typeof QuizzAttemptModel> {
  UserQuizz: CompleteUserQuizz;
  Quizz: CompleteQuizz;
}

/**
 * RelatedQuizzAttemptModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQuizzAttemptModel: z.ZodSchema<CompleteQuizzAttempt> =
  z.lazy(() =>
    QuizzAttemptModel.extend({
      UserQuizz: RelatedUserQuizzModel,
      Quizz: RelatedQuizzModel,
    }),
  );
