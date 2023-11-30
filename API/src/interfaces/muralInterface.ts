import { Mural } from "@prisma/client"
import { HttpResponse } from "./interfaces";

export interface IMuralRepository {
  getAllMurals: () => Promise<Mural[]>;
  getMuralById: (muralId: number) => Promise<Mural | null>;
  getMuralsByGroupId: (groupId: string) => Promise<Mural[]>;
  createMural: ({ name, category, groupId, imgMural }: Pick<Mural, "name" | "category" | "groupId" | "imgMural">) => Promise<Mural>;
  updateMural: ({ name, category, imgMural }: Mural, id: number) => Promise<Mural>;
  removeMural: (muralId: number) => Promise<Mural>;
}

export interface IMuralService {
  getAllMurals: () => Promise<HttpResponse<Mural[]>>;
  getMuralsByGroupId: (groupId: string) => Promise<HttpResponse<Mural[]>>;
  createMural: (data: Mural) => Promise<HttpResponse<Mural>>;
  updateMural: ({ name, category, imgMural }: Mural, id: number) => Promise<HttpResponse<Mural>>;
  removeMural: (id: number) => Promise<HttpResponse<Mural>>;
  generateCode: (groupId: string, muralId: number) => Promise<HttpResponse<string>>;
}