import { User } from "../../models/User";

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
}

export interface IUserService {
  getAllUsers(): Promise<User[]>;
}