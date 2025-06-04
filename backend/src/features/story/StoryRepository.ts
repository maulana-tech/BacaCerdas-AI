import type { Prisma } from "@prisma/client/index";
import prisma from "../../lib/prisma";
import Repository from "../../lib/types/Repository";

export default class StoryRepository extends Repository {
  model = prisma.story;

  async findAll() {
    return await this.model.findMany();
  }

  async findById(id: string) {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.StoryCreateArgs["data"]) {
    return await this.model.create({
      data,
    });
  }
}
