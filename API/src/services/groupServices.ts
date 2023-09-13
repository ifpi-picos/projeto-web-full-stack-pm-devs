import { IGroupRepository, IGroupService } from "../interfaces/groupInterface";
import { Group } from "../models/Group";

export class GroupService implements IGroupService {
  constructor(private groupRepository: IGroupRepository) {}

  async getAllGroups(): Promise<Group[]> {
    return await this.groupRepository.getAllGroups();
  }

  async createGroup(name: string, adminId: string): Promise<Group> {
    return await this.groupRepository.createGroup(name, adminId);
    
  }
}