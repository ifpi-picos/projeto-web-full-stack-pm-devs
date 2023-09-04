import { User } from "../../models/User";

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  addUser(user: User): Promise<Omit<User, "password"> | null>;
}

export interface IUserService {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  addUser(user: User): Promise<Omit<User, "password"> | null>;
}