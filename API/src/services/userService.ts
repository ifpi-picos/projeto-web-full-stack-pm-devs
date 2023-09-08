import { User } from "../models/User";

// Authentication
import bcrypt from "bcrypt";

// Interfaces
import { HttpResponse } from "../interfaces/interfaces";
import {
  IUserRepository,
  IUserService,
} from "../interfaces/userInterface";

export const hashPass = async (password: string): Promise<string> => {
  const salt = process.env.BCRYPT_SALT || '10';
  const saltValue = await bcrypt.genSaltSync(parseInt(salt));
  const hash = await bcrypt.hashSync(password, saltValue);
  return hash;
}

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
  ): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>> {
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
  ): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>> {
    try {
      const userExists = await this.userRepository.getUserByEmail(user.email);
      if (userExists) return {
        statusCode: 400,
        body: "User already exists."
      }

      // Hash password
      user.password = await hashPass(user.password);
      user.username = user.username.toLowerCase();

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
