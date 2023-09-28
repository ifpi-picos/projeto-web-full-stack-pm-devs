import { Member } from "@prisma/client"
import { HttpResponse } from "./interfaces";

export interface IMemberRepository {
  getAllMembers: () => Promise<Member[]>;
  getMemberById: (MemberId: string) => Promise<Member | null>;
  getMemberByUserId: (userId: string) => Promise<Member | null>;
  createMember: ( category: string, userId: string, groupId: string) => Promise<Member>;
  updateMember: (category: string, idMember: string) => Promise<Member>;
  removeMember: (MemberId: string) => Promise<Member>;
}

export interface IMemberService {
  getAllMembers: () => Promise<HttpResponse<Member[]>>;
  addMemberToMural: (userId: string, code: string) => Promise<HttpResponse<Member>>;
  updateMember: (category: string, idMember: string) => Promise<HttpResponse<Member>>;
  removeMember: (MemberId: string) => Promise<HttpResponse<Member>>;
}