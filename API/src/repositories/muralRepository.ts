import { Mural, PrismaClient } from "@prisma/client";
import { IMuralRepository } from "../interfaces/muralInterface";

const prisma = new PrismaClient();

export class MuralRepository implements IMuralRepository {
  async getAllMurals(): Promise<Mural[]> {
    try {
      return await prisma.mural.findMany();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getMuralsByGroupId(groupId: string): Promise<Mural[]> {
    try {
      return await prisma.mural.findMany({
        where: {
          groupId
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async createMural({ name, category, groupId }: Mural): Promise<Mural> {
    try {
      return await prisma.mural.create({
        data: {
          name,
          category,
          groupId,
          created_at: new Date(),
        },
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}