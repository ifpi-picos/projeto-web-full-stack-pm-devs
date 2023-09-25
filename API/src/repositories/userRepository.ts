import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../interfaces/userInterface";
import { User } from "../models/User";

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
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

  async getUserByUsername(username: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: {
          username
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
    isAdmin
  }: User): Promise<User | null> {
    try {
      return await prisma.user.create({
        data: {
          name,
          username,
          email,
          password,
          profile_image: "",
          isAdmin,
          created_at: new Date(),
        },
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async updateUser(id: string, { name, username, password, profile_image }: User): Promise<User | null> {
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        username,
        password,
        profile_image
      }
    })
  }

  async removeUser(id: string): Promise<User | null> {
    try {
      return await prisma.user.delete({
        where: {
          id: id
        }
      })
    } catch (error) {
      throw new Error(`error: ${error}`);
    }  
  }
}
