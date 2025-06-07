import { NotFoundException } from "../../lib/exceptions";
import ResponseBuilder from "../../lib/response-builder";
import StoryTagRepository from "./StoryTagRepository";

export default class StoryTagService {
  private storyTagRepository = new StoryTagRepository();

  async getAllStoryTags() {
    const storyTags = await this.storyTagRepository.findAll();
    return new ResponseBuilder(storyTags).build("story-tags");
  }

  async getStoryTagById(id: string) {
    const storyTag = await this.storyTagRepository.findById(id);

    if (!storyTag) {
      throw new NotFoundException(`Story tag with id ${id} not found`);
    }

    return new ResponseBuilder(storyTag).build("story-tags");
  }
}
