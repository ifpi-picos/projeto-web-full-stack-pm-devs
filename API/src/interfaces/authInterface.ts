import { User } from "../models/User";
import { HttpResponse } from "./interfaces";

export interface IAuthService {
  login: (email: string, password: string) => Promise<HttpResponse<Omit<User, "password">>>;
}