import { Member, PrismaClient } from "@prisma/client";
import { IMemberRepository } from "../interfaces/memberInterface";

const prisma = new PrismaClient();


export class MemberRepository implements IMemberRepository {
  async getAllMembers(): Promise<Member[]> {
    try {
      return await prisma.member.findMany()
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getMemberById(MemberId: string): Promise<Member | null> {
    try {
      return await prisma.member.findUnique({
        where: {
          id: MemberId
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async getMemberByUserId(userId: string): Promise<Member | null> {
    try {
      return await prisma.member.findFirst({
        where: {
          userId
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async createMember(category: string, userId: string, groupId: string): Promise<Member> {
    try {
      return await prisma.member.create({
        data: {
          category,
          created_at: new Date(),
          userId,
          groupId
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async updateMember(category: string, idMember: string): Promise<Member> {
    try {
      return await prisma.member.update({
        where: {
          id: idMember,
        },
        data: {
          category
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async removeMember(MemberId: string): Promise<Member> {
    try {
      return await prisma.member.delete({
        where: {
          id: MemberId
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}