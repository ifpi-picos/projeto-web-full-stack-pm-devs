import { User } from "../models/User";
import { HttpResponse } from "./interfaces";

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  addUser(user: User): Promise<User | null>;
  updateUser(id: string, user: User): Promise<User | null>;
  removeUser(id: string): Promise<User | null>;
}

export interface IUserService {
  getAllUsers(): Promise<HttpResponse<User[]>>;
  getUserById(id: string): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>>;
  addUser(data: User): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>>;
  updateUser(id: string, dataUser: User): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>>;
  removeUser(id: string): Promise<HttpResponse<Omit<User, "password" | "confirmPassword">>>;
}
