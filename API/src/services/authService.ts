import { IAdminRepository } from "../interfaces/adminInterface";
import { IAuthService } from "../interfaces/authInterface";
import { HttpResponse } from "../interfaces/interfaces";
import { IUserRepository } from "../interfaces/userInterface";
import { User } from "../models/User";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const compareHash = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compareSync(password, hash)
}

export const generateToken = (user: Omit<User, "password">): string => {
  const SECRET = process.env.JWT_SECRET_KEY || "SECRET";
  const token = jwt.sign({
    data: user,
  }, SECRET, { expiresIn: "1h" });

  return token;
}


export class AuthService implements IAuthService {
  constructor(private readonly userRepository: IUserRepository, private readonly adminRepository: IAdminRepository) {}

  async login(email: string, password: string): Promise<HttpResponse<string>> {
    try {
      const user = await this.userRepository.getUserByEmail(email);
      const admin = await this.adminRepository.getAdminByEmail(email);

      if(!user && !admin) return {
        statusCode: 400,
        body: "User not registered."
      }

      const current = user || admin;
      const matchPassword = await compareHash(password, current!.password);
      if(!matchPassword) return {
        statusCode: 400,
        body: "Incorrect password."
      }

      const { password: currentPass, ...currentWithoutPassword } = current!;
      currentPass;
      const token = generateToken(currentWithoutPassword)

      return {
        statusCode: 200,
        body: token
      }
      
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }
}