import StoryRepository from "./StoryRepository";
import { StoryStoreSchema } from "./StorySchema";

export default class StoryService {
  private storyRepository = new StoryRepository();

  async getAllStories() {
    const stories = await this.storyRepository.findAll();

    return stories.map((story) => ({
      ...story,
      relationships: {
        user: {
          type: "user",
          data: story.User,
        },
        tag: {
          type: "tag",
          data: story.Tag,
        },
      },
    }));
  }

  async postStory(body: StoryStoreSchema) {
    const { data, relationships } = body;

    return await this.storyRepository.create({
      ...data,
      User: {
        connect: {
          id: relationships.user.data.id,
        },
      },
      Tag: {
        connect: {
          id: relationships.tag.data.id,
        },
      },
    });
  }
}
