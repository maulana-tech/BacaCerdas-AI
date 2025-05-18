import prisma from "../../lib/prisma";

import Repository from "../../lib/types/Repository";

export default class UserRepository extends Repository {
  model = prisma.user;

  constructor() {
    super();
  }

  /**
   * ! Important : Implement proper error handling w/ try/catch
   * @param id
   * @returns
   */
  async findById(id: string) {
    return await this.model.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return await this.model.findMany();
  }
}
