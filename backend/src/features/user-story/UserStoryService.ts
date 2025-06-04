import UserStoryRepository from "./UserStoryRepository";

export default class UserStoryService {
  private userStoryRepository = new UserStoryRepository();

  async getAllUserStories(userId: string) {
    return await this.userStoryRepository.findAllByUserId(userId);
  }
}
