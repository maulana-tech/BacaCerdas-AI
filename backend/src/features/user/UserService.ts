import { NotFoundException } from "../../lib/exceptions";
import ResponseBuilder from "../../lib/response-builder";
import UserRepository from "./UserRepository";

export default class UserService {
  private userRepository = new UserRepository();

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return new ResponseBuilder(users)
      .setExcludedFields(["password"])
      .build("users");
  }

  async getUserByEmailOrUsername(emailOrUsername: string) {
    const user =
      await this.userRepository.findByEmailOrUsername(emailOrUsername);

    if (!user) {
      return new NotFoundException("User not found");
    }

    return new ResponseBuilder(user)
      .setExcludedFields(["password"])
      .build("users");
  }
}
