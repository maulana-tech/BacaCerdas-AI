import prisma from "../../lib/prisma";
import Repository from "../../lib/types/Repository";

export default class StoryTagRepository extends Repository {
  model = prisma.storyTag;

  async findAll() {
    return await this.model.findMany();
  }

  async findById(id: string) {
    return await this.model.findUnique({
      where: { id },
    });
  }
}
