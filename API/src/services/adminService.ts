import { IAdminRepository, IAdminService } from "../interfaces/adminInterface";
import { HttpResponse } from "../interfaces/interfaces";
import { Admin } from "../models/Admin";


export class AdminService implements IAdminService {
  constructor(private readonly adminRepository: IAdminRepository){}

  async getAllAdmins(): Promise<HttpResponse<Admin[]>> {
    try {
      const admins = await this.adminRepository.getAllAdmins();

      if (!admins)
        return {
          statusCode: 400,
          body: "No admins found.",
        };

      return {
        statusCode: 200,
        body: admins,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async getAdminById(id: string): Promise<HttpResponse<Omit<Admin, "password" | "confirmPassword"> | null>> {
    try {
      const admin = await this.adminRepository.getAdminById(id);
      if (!admin)
        return {
          statusCode: 404,
          body: "Admin not found.",
        };

      const { password, ...adminWithoutPass } = admin;
      password;

      return {
        statusCode: 200,
        body: adminWithoutPass,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async addAdmin(admin: Admin): Promise<HttpResponse<Omit<Admin, "password" | "confirmPassword"> | null>> {
    try {
      const adminExists = await this.adminRepository.getAdminByEmail(admin.email);
      if (adminExists) return {
        statusCode: 400,
        body: "Admin already exists."
      }

      const newAdmin = await this.adminRepository.addAdmin(admin);

      if (!newAdmin)
        return {
          statusCode: 400,
          body: "Admin not created.",
        };

      const { password, confirmPassword, ...adminWithoutPass } = newAdmin;
      password;
      confirmPassword;

      return {
        statusCode: 200,
        body: adminWithoutPass,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }
}