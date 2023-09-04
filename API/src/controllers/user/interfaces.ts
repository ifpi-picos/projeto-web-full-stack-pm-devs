import { User } from "../../models/User";

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<Omit<User, "password"> | null>;
}

export interface IUserService {
  getAllUsers(): Promise<User[]>;
  
  getUserById(id: string): Promise<Omit<User, "password"> | null>;
}