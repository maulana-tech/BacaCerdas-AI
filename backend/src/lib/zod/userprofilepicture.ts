import * as z from "zod";
import {
  CompleteUser,
  RelatedUserModel,
  CompleteAsset,
  RelatedAssetModel,
} from "./index";

export const UserProfilePictureModel = z.object({
  id: z.string(),
  userId: z.string(),
  assetId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUserProfilePicture
  extends z.infer<typeof UserProfilePictureModel> {
  User: CompleteUser;
  Asset: CompleteAsset;
}

/**
 * RelatedUserProfilePictureModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserProfilePictureModel: z.ZodSchema<CompleteUserProfilePicture> =
  z.lazy(() =>
    UserProfilePictureModel.extend({
      User: RelatedUserModel,
      Asset: RelatedAssetModel,
    }),
  );
