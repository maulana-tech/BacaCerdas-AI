import * as z from "zod";
import {
  CompleteAsset,
  RelatedAssetModel,
  CompleteCourse,
  RelatedCourseModel,
} from "./index";

export const CourseAssetModel = z.object({
  id: z.string(),
  courseId: z.string(),
  assetId: z.string(),
  isThumbnail: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteCourseAsset extends z.infer<typeof CourseAssetModel> {
  Asset: CompleteAsset;
  Course: CompleteCourse;
}

/**
 * RelatedCourseAssetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCourseAssetModel: z.ZodSchema<CompleteCourseAsset> = z.lazy(
  () =>
    CourseAssetModel.extend({
      Asset: RelatedAssetModel,
      Course: RelatedCourseModel,
    }),
);
