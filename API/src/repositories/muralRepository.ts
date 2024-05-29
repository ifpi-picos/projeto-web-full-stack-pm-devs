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

  async getMuralById(muralId: number): Promise<Mural | null> {
    try {
      return await prisma.mural.findUnique({
        where: {
          id: muralId,
        }
      })
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

  async createMural({ name, category, groupId, imgMural }: Pick<Mural, "name" | "category" | "groupId" | "imgMural">): Promise<Mural> {
    try {
      return await prisma.mural.create({
        data: {
          name,
          category: category,
          imgMural,
          groupId,
          created_at: new Date(),
        },
      });
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async updateMural({ name, imgMural }: Mural, id: number): Promise<Mural> {
    try {
      return await prisma.mural.update({
        where: {
          id
        },
        data: {
          name,
          imgMural
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async removeMural(muralId: number): Promise<Mural> {
    try {
      return await prisma.mural.delete({
        where: {
          id: muralId
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
