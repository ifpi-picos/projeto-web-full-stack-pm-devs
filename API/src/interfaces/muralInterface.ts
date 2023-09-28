import { Mural } from "@prisma/client"
import { HttpResponse } from "./interfaces";

export interface IMuralRepository {
  getAllMurals: () => Promise<Mural[]>;
  getMuralById: (muralId: string) => Promise<Mural | null>;
  getMuralsByGroupId: (groupId: string) => Promise<Mural[]>;
  createMural: ({ name, category, groupId }: Pick<Mural, "name" | "category" | "groupId">) => Promise<Mural>;
  updateMural: ({ name, category }: Mural, id: string) => Promise<Mural>;
  removeMural: (muralId: string) => Promise<Mural>;
}

export interface IMuralService {
  getAllMurals: () => Promise<HttpResponse<Mural[]>>;
  getMuralsByGroupId: (groupId: string) => Promise<HttpResponse<Mural[]>>;
  createMural: (data: Mural) => Promise<HttpResponse<Mural>>;
  updateMural: ({ name, category }: Mural, id: string) => Promise<HttpResponse<Mural>>;
  removeMural: (id: string) => Promise<HttpResponse<Mural>>;
}