import { NotFoundException } from "../../lib/exceptions";
import ResponseBuilder from "../../lib/response-builder";
import StoryRepository from "./StoryRepository";
import { StoryStoreSchema } from "./StorySchema";

export default class StoryService {
  private storyRepository = new StoryRepository();

  async getAllStories() {
    const stories = await this.storyRepository.findAll();

    return new ResponseBuilder(stories)
      .setExcludedFields(["userId", "tagId"])
      .setRelationships(["User", "Tag"])
      .build("stories");
  }

  async postStory(body: StoryStoreSchema) {
    const { data, relationships } = body;
    const story = await this.storyRepository.create({
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

    return new ResponseBuilder(story)
      .setExcludedFields(["userId", "tagId"])
      .setRelationships(["User", "Tag"])
      .build("stories");
  }

  async getStoryById(id: string) {
    const story = await this.storyRepository.findById(id);

    if (!story) {
      throw new NotFoundException(`Story with id ${id} not found`);
    }

    return new ResponseBuilder(story)
      .setExcludedFields(["userId", "tagId"])
      .setRelationships(["User", "Tag"])
      .build("stories");
  }

  async updateStory(id: string, body: StoryStoreSchema) {
    const existingStory = await this.storyRepository.findById(id);
    
    if (!existingStory) {
      throw new NotFoundException(`Story with id ${id} not found`);
    }

    const { data, relationships } = body;
    const updatedStory = await this.storyRepository.update(id, {
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

    return new ResponseBuilder(updatedStory)
      .setExcludedFields(["userId", "tagId"])
      .setRelationships(["User", "Tag"])
      .build("stories");
  }

  async deleteStory(id: string) {
    const existingStory = await this.storyRepository.findById(id);
    
    if (!existingStory) {
      throw new NotFoundException(`Story with id ${id} not found`);
    }

    await this.storyRepository.delete(id);
  }
}