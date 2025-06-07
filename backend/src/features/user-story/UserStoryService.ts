import ResponseBuilder from "../../lib/response-builder";
import UserStoryRepository from "./UserStoryRepository";

export default class UserStoryService {
  private userStoryRepository = new UserStoryRepository();

  async getAllUserStories(userId: string) {
    const userStories = await this.userStoryRepository.findAllByUserId(userId);

    return new ResponseBuilder(userStories)
      .setExcludedFields(["userId", "tagId"])
      .setRelationships(["User", "Tag"])
      .build("user-stories");
  }
}
