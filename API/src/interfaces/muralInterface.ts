import { Mural } from "@prisma/client"
import { HttpResponse } from "./interfaces";

export interface IMuralRepository {
  getAllMurals: () => Promise<Mural[]>;
  getMuralsByGroupId: (groupId: string) => Promise<Mural[]>;
  createMural: ({ name, category, groupId }: Mural) => Promise<Mural>;
}

export interface IMuralService {
  getAllMurals: () => Promise<HttpResponse<Mural[]>>;
  getMuralsByGroupId: (groupId: string) => Promise<HttpResponse<Mural[]>>;
  createMural: (data: Mural) => Promise<HttpResponse<Mural>>;
}