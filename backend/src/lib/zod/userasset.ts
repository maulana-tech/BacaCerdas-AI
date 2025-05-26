import * as z from "zod";
import {
  CompleteUserProfile,
  RelatedUserProfileModel,
  CompleteAsset,
  RelatedAssetModel,
} from "./index";

export const UserAssetModel = z.object({
  id: z.string(),
  assetId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUserAsset extends z.infer<typeof UserAssetModel> {
  userProfile: CompleteUserProfile[];
  asset: CompleteAsset;
}

/**
 * RelatedUserAssetModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserAssetModel: z.ZodSchema<CompleteUserAsset> = z.lazy(
  () =>
    UserAssetModel.extend({
      userProfile: RelatedUserProfileModel.array(),
      asset: RelatedAssetModel,
    }),
);
