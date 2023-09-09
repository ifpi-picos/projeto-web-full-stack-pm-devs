import { Group } from "../models/Group";

export interface IGroupRepository {
  getAllGroups: () => Promise<Group[]>;
  getGroupByAdminId(idAdmin: string): Promise<Group | null>
  createGroup: (name: string, adminId: string) => Promise<Group>;
}

export interface IGroupService {
  getAllGroups():  Promise<Group[]>;
  createGroup(name: string, adminId: string): Promise<Group>;
}