import { z } from "zod";
import { StoryModel, StoryTagModel, UserModel } from "../../lib/zod";

export default class StorySchema {
  static store() {
    return z.object({
      data: StoryModel.pick({
        title: true,
        content: true,
      }),
      relationships: z.object({
        user: z.object({
          data: UserModel.pick({
            id: true,
          }),
        }),
        tag: z.object({
          data: StoryTagModel.pick({
            id: true,
          }),
        }),
      }),
    });
  }
}

export type StoryStoreSchema = z.infer<ReturnType<typeof StorySchema.store>>;
