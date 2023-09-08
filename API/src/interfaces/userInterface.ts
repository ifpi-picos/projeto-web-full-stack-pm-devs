import { User } from "../models/User";
import { HttpResponse } from "./interfaces";

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  addUser(user: User): Promise<User | null>;
}

export interface IUserService {
  getAllUsers(): Promise<HttpResponse<User[]>>;
  getUserById(id: string): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>>;
  addUser(user: User): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>>;
  loginUser(email: string, password: string): Promise<HttpResponse<Omit<User, "password">>>;
}
