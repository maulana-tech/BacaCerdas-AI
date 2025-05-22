import UserRepository from "./UserRepository";

export default class UserService {
  private userRepository = new UserRepository();

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserByEmailOrUsername(emailOrUsername: string) {
    return await this.userRepository.findByEmailOrUsername(emailOrUsername);
  }
}
