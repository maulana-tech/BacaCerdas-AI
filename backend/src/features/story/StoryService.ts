import StoryRepository from "./StoryRepository";
import { StoryStoreSchema } from "./StorySchema";

export default class StoryService {
  private storyRepository = new StoryRepository();

  async getAllStories() {
    return await this.storyRepository.findAll();
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
