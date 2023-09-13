import { IGroupRepository, IGroupService } from "../interfaces/groupInterface";
import { HttpResponse } from "../interfaces/interfaces";
import { Group } from "../models/Group";

export class GroupService implements IGroupService {
  constructor(private groupRepository: IGroupRepository) {}

  async getAllGroups(): Promise<HttpResponse<Group[]>> {
    try {
      const groups = await this.groupRepository.getAllGroups();
      if(!groups) return {
        statusCode: 400,
        body: "Groups not registered."
      }
  
      return {
        statusCode: 200,
        body: groups
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async getGroupByUserId(userId: string): Promise<HttpResponse<Group | null>> {
    try {
      const group = await this.groupRepository.getGroupByUserId(userId);
      if(!group) return {
        statusCode: 400,
        body: "Group not found"
      }
  
      return {
        statusCode: 200,
        body: group
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async createGroup(name: string, adminId: string): Promise<HttpResponse<Group>> {
    try {
      const group = await this.groupRepository.createGroup(name, adminId);
      if(!group) return {
        statusCode: 400,
        body: "Group not created.",
      }
  
      return {
        statusCode: 200,
        body: group
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }
}