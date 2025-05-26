import * as z from "zod";
import {
  CompleteUser,
  RelatedUserModel,
  CompleteCourse,
  RelatedCourseModel,
} from "./index";

export const SummarizedCourseModel = z.object({
  id: z.string(),
  courseId: z.string(),
  userId: z.string(),
  summary: z.string(),
  rating: z.number().int().nullish(),
  feedback: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteSummarizedCourse
  extends z.infer<typeof SummarizedCourseModel> {
  User: CompleteUser;
  Course: CompleteCourse;
}

/**
 * RelatedSummarizedCourseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSummarizedCourseModel: z.ZodSchema<CompleteSummarizedCourse> =
  z.lazy(() =>
    SummarizedCourseModel.extend({
      User: RelatedUserModel,
      Course: RelatedCourseModel,
    }),
  );
