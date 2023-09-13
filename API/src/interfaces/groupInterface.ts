import { Group } from "../models/Group";
import { HttpResponse } from "./interfaces";

export interface IGroupRepository {
  getAllGroups: () => Promise<Group[]>;
  getGroupByUserId(userId: string): Promise<Group | null>
  createGroup: (name: string, userId: string) => Promise<Group>;
}

export interface IGroupService {
  getAllGroups():  Promise<HttpResponse<Group[]>>;
  getGroupByUserId(userId: string): Promise<HttpResponse<Group | null>>;
  createGroup(name: string, userId: string): Promise<HttpResponse<Group>>;
}