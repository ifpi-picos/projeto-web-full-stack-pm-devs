import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/interfaces";
import { User } from "../models/User";

const prisma = new PrismaClient();

export class userRepository implements IUserRepository {
  async getAllUsers(): Promise<User[]> {
    try {
      return await prisma.user.findMany();
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }


  async addUser({
    name,
    username,
    email,
    password,
  }: User): Promise<User | null> {
    try {
      return await prisma.user.create({
        data: {
          name,
          username,
          email,
          password,
          profile_image: "",
          created_at: new Date(),
        },
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }
}
