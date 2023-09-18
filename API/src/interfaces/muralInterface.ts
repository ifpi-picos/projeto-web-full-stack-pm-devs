import { Mural } from "@prisma/client"

export interface IMuralRepository {
  getAllMurals: () => Promise<Mural[]>;
  getMuralsByGroupId: (groupId: string) => Promise<Mural[]>;
  createMural: ({ name, category, groupId }: Mural) => Promise<Mural>;
}