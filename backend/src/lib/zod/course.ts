import * as z from "zod";
import { CourseLessonType } from "@prisma/client";
import {
  CompleteCourseAsset,
  RelatedCourseAssetModel,
  CompleteSummarizedCourse,
  RelatedSummarizedCourseModel,
  CompleteUser,
  RelatedUserModel,
} from "./index";

export const CourseModel = z.object({
  id: z.string(),
  slug: z.string(),
  teacherId: z.string(),
  courseAssetId: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  type: z.nativeEnum(CourseLessonType),
  tags: z.string().array(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteCourse extends z.infer<typeof CourseModel> {
  CourseAsset: CompleteCourseAsset[];
  SummarizedCourse: CompleteSummarizedCourse[];
  User: CompleteUser;
}

/**
 * RelatedCourseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseModel: z.ZodSchema<CompleteCourse> = z.lazy(() =>
  CourseModel.extend({
    CourseAsset: RelatedCourseAssetModel.array(),
    SummarizedCourse: RelatedSummarizedCourseModel.array(),
    User: RelatedUserModel,
  }),
);
