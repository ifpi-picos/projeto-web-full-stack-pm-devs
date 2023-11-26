import { Mural } from "@prisma/client";
import { Group } from "../models/Group";
import { HttpResponse } from "../interfaces/interfaces";
import { MuralService } from "./muralService";
import { UserService } from "./userService";

import { IGroupRepository, IGroupService } from "../interfaces/groupInterface";
import { IUserRepository } from "../interfaces/userInterface";
import { IMuralRepository } from "../interfaces/muralInterface";

import { MuralRepository } from "../repositories/muralRepository";
import { UserRepository } from "../repositories/userRepository";

export class GroupService implements IGroupService {
  private _muralRepository: IMuralRepository;
  private _userRepository: IUserRepository;

  constructor(private readonly groupRepository: IGroupRepository) {
    this._userRepository = new UserRepository();
    this._muralRepository = new MuralRepository();
  }

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

  async getGroupById(groupId: string): Promise<HttpResponse<Group | null>> {
    try {
      const group = await this.groupRepository.getGroupById(groupId);
      if(!group) return {
        statusCode: 404,
        body: "Group not found."
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

  async getGroupByUserId(userId: string): Promise<HttpResponse<Group | null>> {
    try {
      const group = await this.groupRepository.getGroupByUserId(userId);
      if(!group) return {
        statusCode: 404,
        body: "Group not found."
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

  async getGroupMurals(userId: string): Promise<HttpResponse<Mural[] | null>> {
    try {
      const group = await this.groupRepository.getGroupByUserId(userId);
      if(!group) return {
        statusCode: 404,
        body: "Group not found."
      }

      const { statusCode, body: murals } = await new MuralService(this._muralRepository).getMuralsByGroupId(group.id);

      if(statusCode !== 200) return {
        statusCode: statusCode,
        body: murals
      }

      return {
        statusCode: 200,
        body: murals
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async createGroup(name: string, userId: string, imgGroup: string): Promise<HttpResponse<Group>> {
    try {
      const { statusCode, body: user } = await new UserService(this._userRepository).getUserById(userId);

      if(statusCode !== 200 || typeof user === "string") return {
        statusCode: statusCode,
        body: `User does not exist or does not have permission.`
      }

      const userGroupExist = await this.groupRepository.getGroupByUserId(userId);
      if(userGroupExist) return {
        statusCode: 400,
        body: `User does not exist or does not have permission.`
      }

      if(!user || !user.isAdmin) return {
        statusCode: 400,
        body: `User does not exist or does not have permission.`
      }
      const group = await this.groupRepository.createGroup(name, userId, imgGroup);
      if(!group) return {
        statusCode: 400,
        body: "Group not created.",
      }
  
      return {
        statusCode: 201,
        body: "Group created successfully.",
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async updateGroup(name: string, userId: string, imgGroup: string): Promise<HttpResponse<Group>>{
    try {
      const userGroup = await this.groupRepository.getGroupByUserId(userId);
      if(!userGroup) return {
        statusCode: 404,
        body: "Group not found."
      }

      await this.groupRepository.updateGroup(name, userId, imgGroup);

      return {
        statusCode: 200,
        body: "Group updated successfully."
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }

  async removeGroup(userId: string): Promise<HttpResponse<Group>>{
    try {
      const userGroup = await this.groupRepository.getGroupByUserId(userId);
      if(!userGroup) return {
        statusCode: 404,
        body: "Group not found."
      }

      await this.groupRepository.removeGroup(userId);
      
      return {
        statusCode: 200,
        body: "Group removed successfully."
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`,
      };
    }
  }
}
