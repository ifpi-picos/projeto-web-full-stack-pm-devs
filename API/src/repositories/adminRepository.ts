import { IAdminRepository } from "../interfaces/adminInterface";
import { PrismaClient } from "@prisma/client";
import { Admin } from "../models/Admin";

const prisma = new PrismaClient();

export class AdminRepository implements IAdminRepository {
  async getAllAdmins(): Promise<Admin[]> {
    try {
      return await prisma.admin.findMany();
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async getAdminById(id: string): Promise<Admin | null> {
    try {
      return await prisma.admin.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async getAdminByEmail(email: string): Promise<Admin | null> {
    try {
      return await prisma.admin.findUnique({
        where: {
          email: email,
        },
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }

  async addAdmin({ name, username, email, password, phoneNumber }: Admin): Promise<Admin | null> {
    try {
      return await prisma.admin.create({
        data: {
          name,
          username,
          email,
          password,
          phoneNumber,
          isAdmin: true,
          profile_image: "",
          created_at: new Date(),
        },
      });
    } catch (error) {
      throw new Error(`error: ${error}`);
    }
  }
}