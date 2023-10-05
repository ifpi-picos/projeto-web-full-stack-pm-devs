import { Mural } from "@prisma/client";
import { Group } from "../models/Group";
import { HttpResponse } from "./interfaces";

export interface IGroupRepository {
  getAllGroups: () => Promise<Group[]>;
  getGroupById: (groupId: string) => Promise<Group | null>;
  getGroupByUserId(userId: string): Promise<Group | null>;
  createGroup: (name: string, userId: string) => Promise<Group>;
  updateGroup: (name: string, userId: string) => Promise<Group>;
  removeGroup: (userId: string) => Promise<Group>;
}

export interface IGroupService {
  getAllGroups():  Promise<HttpResponse<Group[]>>;
  getGroupById: (groupId: string) => Promise<HttpResponse<Group | null>>;
  getGroupByUserId(userId: string): Promise<HttpResponse<Group | null>>;
  getGroupMurals(userId: string): Promise<HttpResponse<Mural[] | null>>;
  createGroup(name: string, userId: string): Promise<HttpResponse<Group>>;
  updateGroup: (name: string, userId: string) => Promise<HttpResponse<Group>>;
  removeGroup: (userId: string) => Promise<HttpResponse<Group>>;
}