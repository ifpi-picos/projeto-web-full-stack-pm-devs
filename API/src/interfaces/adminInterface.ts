import { Group } from "@prisma/client";
import { Admin } from "../models/Admin";
import { HttpResponse } from "./interfaces";

export interface IAdminRepository {
  getAllAdmins(): Promise<Admin[]>;
  getAdminById(id: string): Promise<Admin | null>;
  getAdminByEmail(email: string): Promise<Admin | null>;
  addAdmin(admin: Admin): Promise<Admin | null>;
}

export type AdminAndGroup = {
  admin: Omit<Admin, "password" | "confirmPassword">;
  group: Group; 
}

export interface IAdminService {
  getAllAdmins(): Promise<HttpResponse<Admin[]>>;
  getAdminById(id: string): Promise<HttpResponse<AdminAndGroup | null>>;
  addAdmin(admin: Admin): Promise<HttpResponse<Omit<Admin, "password" | "confirmPassword"> | null>>;
}
