import StoryTagRepository from "./StoryTagRepository";

export default class StoryTagService {
  private storyTagRepository = new StoryTagRepository();

  async getAllStoryTags() {
    return await this.storyTagRepository.findAll();
  }

  async getStoryTagById(id: string) {
    return await this.storyTagRepository.findById(id);
  }
}
