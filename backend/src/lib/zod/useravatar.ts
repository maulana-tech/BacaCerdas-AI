import * as z from "zod";
import {
  CompleteUser,
  RelatedUserModel,
  CompleteAsset,
  RelatedAssetModel,
} from "./index";

export const UserAvatarModel = z.object({
  id: z.string(),
  userId: z.string(),
  assetId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteUserAvatar extends z.infer<typeof UserAvatarModel> {
  User: CompleteUser;
  Asset: CompleteAsset;
}

/**
 * RelatedUserAvatarModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserAvatarModel: z.ZodSchema<CompleteUserAvatar> = z.lazy(
  () =>
    UserAvatarModel.extend({
      User: RelatedUserModel,
      Asset: RelatedAssetModel,
    }),
);
