import * as z from "zod";
import { CompleteStory, RelatedStoryModel } from "./index";

export const StoryTagModel = z.object({
  id: z.string(),
  tag: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export interface CompleteStoryTag extends z.infer<typeof StoryTagModel> {
  Story: CompleteStory[];
}

/**
 * RelatedStoryTagModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedStoryTagModel: z.ZodSchema<CompleteStoryTag> = z.lazy(() =>
  StoryTagModel.extend({
    Story: RelatedStoryModel.array(),
  }),
);
