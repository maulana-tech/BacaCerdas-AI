import * as z from "zod";
import {
  CompleteUser,
  RelatedUserModel,
  CompleteUserAsset,
  RelatedUserAssetModel,
} from "./index";

export const UserProfileModel = z.object({
  id: z.string(),
  userId: z.string(),
  assetId: z.string(),
  name: z.string(),
  bio: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUserProfile extends z.infer<typeof UserProfileModel> {
  user: CompleteUser;
  picture?: CompleteUserAsset | null;
}

/**
 * RelatedUserProfileModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserProfileModel: z.ZodSchema<CompleteUserProfile> = z.lazy(
  () =>
    UserProfileModel.extend({
      user: RelatedUserModel,
      picture: RelatedUserAssetModel.nullish(),
    }),
);
