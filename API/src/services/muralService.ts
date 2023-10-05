import { Mural } from "@prisma/client";
import { HttpResponse } from "../interfaces/interfaces";

import { IMuralRepository, IMuralService } from "../interfaces/muralInterface";
import { IGroupRepository } from "../interfaces/groupInterface";

import { GroupRepository } from "../repositories/groupRepository";

import { GroupService } from "./groupService";


export class MuralService implements IMuralService {
  private _groupRepository: IGroupRepository;
  constructor(private readonly muralRepository: IMuralRepository) {
    this._groupRepository = new GroupRepository();
  }

  async getAllMurals(): Promise<HttpResponse<Mural[]>>{
    try {
      const murals = await this.muralRepository.getAllMurals();
      if(!murals) return {
        statusCode: 404,
        body: "Murals not found."
      }
      
      return {
        statusCode: 200,
        body: murals
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }

  async getMuralsByGroupId(groupId: string): Promise<HttpResponse<Mural[]>> {
    try {
      const murals = await this.muralRepository.getMuralsByGroupId(groupId);
      if(!murals || murals.length <= 0) return {
        statusCode: 400,
        body: "Murals not found."
      }

      return {
        statusCode: 200,
        body: murals
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }
  
  async createMural(data: Pick<Mural, "name" | "category" | "groupId">): Promise<HttpResponse<Mural>> {
    try {
      const groupExists = await new GroupService(this._groupRepository).getGroupById(data.groupId);
      if(!groupExists) return {
        statusCode: 404,
        body: "Group not found."
      }

      const murals = await this.muralRepository.getAllMurals();
      for(const unit of murals) {
        if(unit.category === data.category.toLowerCase()) return {
          statusCode: 400,
          body: "Category already registered."
        }
      }

      data.category = data.category.toLowerCase();

      const mural = await this.muralRepository.createMural(data);
      if(!mural) return {
        statusCode: 400,
        body: "Mural not created."
      }

      return {
        statusCode: 201,
        body: "Mural created successfully."
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }

  async updateMural(data: Mural, id: number): Promise<HttpResponse<Mural>> {
    try {
      const existsMural = await this.muralRepository.getMuralById(id);
      if (!existsMural) return {
        statusCode: 404,
          body: "Mural not found."
      }

      const murals = await this.muralRepository.getAllMurals();
      for(const unit of murals) {
        if(unit.category === data.category.toLowerCase()) return {
          statusCode: 400,
          body: "Category already registered."
        }
      }

      const fields: (keyof Pick<
        Mural,
        "name" | "category"
      >)[] = ["name", "category"];
      for (const field of fields) {
        if (!data[field]) {
          data[field] = existsMural[field]!;
        }
      }

      data.category = data.category.toLowerCase();

      await this.muralRepository.updateMural(data, id);

      return {
        statusCode: 200,
        body: "Mural updated successfully."
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }

  async removeMural(id: number): Promise<HttpResponse<Mural>>{
    try {
      const existsMural = await this.muralRepository.getMuralById(id);
      if (!existsMural) return {
        statusCode: 404,
          body: "Mural not found."
      }

      const res = await this.muralRepository.removeMural(id);
      console.log(res);

      return {
        statusCode: 200,
        body: "Mural deleted successfully."
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }

  async generateCode(groupId: string, muralId: number): Promise<HttpResponse<string>>{
    try {
      const { statusCode, body: groupExists } = await new GroupService(this._groupRepository).getGroupById(groupId);

      if(statusCode !== 200 && typeof(groupExists) === "string") return {
        statusCode: statusCode,
        body: groupExists
      }

      const muralExists = await this.muralRepository.getMuralById(muralId);
      if(!muralExists) return {
        statusCode: 404,
        body: "Mural not found."
      }

      const code = `${groupId}` + "!" + `${muralId}`;

      return {
        statusCode: 200,
        body: code
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }
}