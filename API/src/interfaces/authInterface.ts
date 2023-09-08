import { HttpResponse } from "./interfaces";

export interface IAuthService {
  login: (email: string, password: string) => Promise<HttpResponse<string>>;
}