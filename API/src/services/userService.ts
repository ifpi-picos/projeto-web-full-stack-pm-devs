import { User } from "../models/User";

// Interfaces
import { HttpResponse } from "../interfaces/interfaces";
import {
  IUserRepository,
  IUserService,
} from "../interfaces/userInterface";

export class userService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAllUsers(): Promise<HttpResponse<User[]>> {
    try {
      const users = await this.userRepository.getAllUsers();

      if (!users)
        return {
          statusCode: 400,
          body: "No users found.",
        };

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async getUserById(
    id: string
  ): Promise<HttpResponse<Omit<User, "password" | "confirmPassword"> | null>> {
    try {
      const user = await this.userRepository.getUserById(id);
      if (!user)
        return {
          statusCode: 404,
          body: "User not found.",
        };

      const { password, ...userWithoutPass } = user;
      password;

      return {
        statusCode: 200,
        body: userWithoutPass,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async addUser(
    user: User
  ): Promise<HttpResponse<Omit<User, "password" | "confirmPassword"> | null>> {
    try {
      const userExists = await this.userRepository.getUserByEmail(user.email);
      if (userExists) return {
        statusCode: 400,
        body: "User already exists."
      }

      const newUser = await this.userRepository.addUser(user);

      if (!newUser)
        return {
          statusCode: 400,
          body: "User not created.",
        };

      const { password, confirmPassword, ...userWithoutPass } = newUser;
      password;
      confirmPassword;

      return {
        statusCode: 200,
        body: userWithoutPass,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }
}
