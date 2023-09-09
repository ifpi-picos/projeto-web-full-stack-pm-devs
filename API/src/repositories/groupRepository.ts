import { IGroupRepository } from "../interfaces/groupInterface";
import { Group } from "../models/Group";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class GroupRepository implements IGroupRepository {
  async getAllGroups(): Promise<Group[]> {
    try {
      return await prisma.group.findMany();
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async getGroupByAdminId(idAdmin: string): Promise<Group | null> {
    try {
      return await prisma.group.findUnique({
        where: {
          adminId: idAdmin
        }
      })
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async createGroup(name: string, adminId: string): Promise<Group> {
    try {
      return prisma.group.create({
        data: {
          name,
          adminId: adminId,
          created_at: new Date(),
        },
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }
}
