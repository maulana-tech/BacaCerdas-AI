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
  async registerUser(userData: Omit<User, "createdAt" | "updatedAt">) {
    // Logic to register a new user
    // This might involve hashing the password and saving the user data to a database
    const userRepository = new UserRepository();

    const existingUser = await userRepository.findByEmailOrUsername(
      userData.email,
      userData.role,
    );

    if (existingUser) {
      throw new UnauthorizedException("User already exists");
    }

    const hashedPassword = bcrypt.hashSync(userData.password, 10);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...newUser } = await userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return newUser;
  }

  generateToken(user: Omit<User, "password">) {
    const pkey = fs.readFileSync(
      path.resolve(__dirname, "../../../key", "jwt.pem"),
    );

    const token = jwt.sign(user, pkey, { algorithm: "RS256", expiresIn: "8w" }); // 2 months

    return token;
  }
}
