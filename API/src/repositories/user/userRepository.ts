import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../controllers/user/interfaces";
import { User } from "../../models/User";

const prisma = new PrismaClient();

export class userRepository implements IUserRepository{
  async getAllUsers(): Promise<User[]> {
      return await prisma.user.findMany();
  }
}