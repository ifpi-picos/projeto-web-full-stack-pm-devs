import { User } from "../models/User";

// Authentication
import bcrypt from "bcrypt";

// Interfaces
import { HttpResponse } from "../interfaces/interfaces";
import { IUserRepository, IUserService } from "../interfaces/userInterface";

export const hashPass = async (password: string): Promise<string> => {
  const salt = process.env.BCRYPT_SALT || "10";
  const saltValue = await bcrypt.genSaltSync(parseInt(salt));
  const hash = await bcrypt.hashSync(password, saltValue);
  return hash;
};

export class UserService implements IUserService {
  constructor(
    private readonly userRepository: IUserRepository
  ) {}

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
    data: User & { groupName: string }
  ): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>> {
    try {
      const userExistsEmail = await this.userRepository.getUserByEmail(data.email);
      const userExistsUsername = await this.userRepository.getUserByUsername(data.username);
      if (userExistsEmail || userExistsUsername)
        return {
          statusCode: 400,
          body: "User already exists.",
        };

      // Hash password
      data.password = await hashPass(data.password);
      data.username = data.username.toLowerCase();

      const newUser = await this.userRepository.addUser(data);
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

  async updateUser(
    id: string,
    dataUser: User
  ): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>> {
    try {
      const userExists = await this.userRepository.getUserById(id);
      if (!userExists)
        return {
          statusCode: 404,
          body: "User not found.",
        };

      const fields: (keyof Pick<
        User,
        "name" | "username" | "password" | "profile_image"
      >)[] = ["name", "username", "password", "profile_image"];
      for (const field of fields) {
        if (!dataUser[field]) {
          dataUser[field] = userExists[field]!;
        }
      }

      const newUser = await this.userRepository.updateUser(id, dataUser);
      if (!newUser)
        return {
          statusCode: 400,
          body: "User not updated.",
        };

      const { password, confirmPassword, ...newUserWithoutPassword } = newUser;
      password;
      confirmPassword;

      return {
        statusCode: 200,
        body: newUserWithoutPassword,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async removeUser(
    id: string
  ): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>> {
    try {
      const user = await this.userRepository.removeUser(id);
      if (!user)
        return {
          statusCode: 404,
          body: "User not found.",
        };

      const { password, confirmPassword, ...userWithoutPassword } = user;
      password;
      confirmPassword;

      return {
        statusCode: 200,
        body: userWithoutPassword,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }
}
