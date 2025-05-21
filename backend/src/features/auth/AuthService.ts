import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserRepository from "../user/UserRepository";

import { UnauthorizedException } from "../../lib/exceptions";
import type { Role, User } from "@prisma/client";
import path from "path";

export default class AuthService {
  // This class is responsible for handling authentication logic
  // It should interact with the UserRepository to perform authentication tasks

  // Example method to authenticate a user
  async authenticateUser(data: {
    identifier: string;
    password: string;
    role: Role;
  }) {
    // Logic to authenticate user using email and password
    // This might involve checking the credentials against a database
    // and returning a user object or an Error("Invalid credentials");error
    const userRepository = new UserRepository();

    const user = await userRepository.findByEmailOrUsername(
      data.identifier,
      data.role,
    );

    if (!user) {
      throw new UnauthorizedException("Invalid credentials, user not found");
    }

    const isCorrectPassword = bcrypt.compareSync(data.password, user.password);

    if (!isCorrectPassword) {
      throw new UnauthorizedException("Invalid credentials, password mismatch");
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    const token = this.generateToken(userWithoutPassword);

    return {
      ...userWithoutPassword,
      token,
    };
  }

  // Example method to register a new user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async registerUser(userData: unknown) {
    // Logic to register a new user
    // This might involve hashing the password and saving the user data to a database
  }

  generateToken(user: Omit<User, "password">) {
    const pkey = fs.readFileSync(
      path.resolve(__dirname, "../../../key", "jwt.pem"),
    );

    const token = jwt.sign(user, pkey, { algorithm: "RS256", expiresIn: "8w" }); // 2 months

    return token;
  }
}
