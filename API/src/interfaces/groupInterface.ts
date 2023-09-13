import { Group } from "../models/Group";

export interface IGroupRepository {
  getAllGroups: () => Promise<Group[]>;
  getGroupByAdminId(userId: string): Promise<Group | null>
  createGroup: (name: string, userId: string) => Promise<Group>;
}

export interface IGroupService {
  getAllGroups():  Promise<Group[]>;
  createGroup(name: string, userId: string): Promise<Group>;
}