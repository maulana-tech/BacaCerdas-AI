import * as z from "zod";
import {
  CompleteUserProfilePicture,
  RelatedUserProfilePictureModel,
  CompleteCourseAsset,
  RelatedCourseAssetModel,
} from "./index";

export const AssetModel = z.object({
  id: z.string(),
  name: z.string(),
  mimeType: z.string(),
  size: z.number().int(),
  type: z.string(),
  url: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteAsset extends z.infer<typeof AssetModel> {
  UserProfilePicture: CompleteUserProfilePicture[];
  CourseAsset: CompleteCourseAsset[];
}

/**
 * RelatedAssetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedAssetModel: z.ZodSchema<CompleteAsset> = z.lazy(() =>
  AssetModel.extend({
    UserProfilePicture: RelatedUserProfilePictureModel.array(),
    CourseAsset: RelatedCourseAssetModel.array(),
  }),
);
