import { IGroupRepository, IGroupService } from "../interfaces/groupInterface";
import { HttpResponse } from "../interfaces/interfaces";
import { IUserRepository } from "../interfaces/userInterface";
import { Group } from "../models/Group";

export class GroupService implements IGroupService {
  constructor(private readonly groupRepository: IGroupRepository, private readonly userRepository: IUserRepository) {}

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

  async createGroup(name: string, userId: string): Promise<HttpResponse<Group>> {
    try {
      const user = await this.userRepository.getUserById(userId);
      if(!user || !user.isAdmin) return {
        statusCode: 400,
        body: `User does not exist or does not have permission.`
      }
      const group = await this.groupRepository.createGroup(name, userId);
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