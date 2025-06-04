import * as z from "zod";
import {
  CompleteUser,
  RelatedUserModel,
  CompleteStoryTag,
  RelatedStoryTagModel,
} from "./index";

export const StoryModel = z.object({
  id: z.string(),
  userId: z.string(),
  tagId: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteStory extends z.infer<typeof StoryModel> {
  User: CompleteUser;
  Tag: CompleteStoryTag;
}

/**
 * RelatedStoryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoryModel: z.ZodSchema<CompleteStory> = z.lazy(() =>
  StoryModel.extend({
    User: RelatedUserModel,
    Tag: RelatedStoryTagModel,
  }),
);
