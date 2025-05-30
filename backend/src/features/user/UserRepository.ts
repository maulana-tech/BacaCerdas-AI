import type { Role, User } from "@prisma/client";
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

  async findByEmailOrUsername(emailOrUsername: string, role?: Role) {
    const user = await this.model.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
        ...(role && { role }),
      },
    });

    return user;
  }

  async findAll() {
    return await this.model.findMany();
  }

  async create(data: Omit<User, "id" | "createdAt" | "updatedAt">) {
    return await this.model.create({
      data: {
        ...data,
      },
    });
  }
}
