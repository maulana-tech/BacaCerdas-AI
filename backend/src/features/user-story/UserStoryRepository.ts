import StoryRepository from "../story/StoryRepository";

export default class UserStoryRepository extends StoryRepository {
  async findAllByUserId(userId: string) {
    return await this.model.findMany({
      where: {
        User: {
          id: userId,
        },
      },
      include: {
        User: true,
        Tag: true,
      },
    });
  }
}
