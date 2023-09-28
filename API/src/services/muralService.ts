import { Mural } from "@prisma/client";
import { HttpResponse } from "../interfaces/interfaces";
import { IMuralRepository, IMuralService } from "../interfaces/muralInterface";
import { IGroupRepository } from "../interfaces/groupInterface";


export class MuralService implements IMuralService {
  constructor(private readonly muralRepository: IMuralRepository, private readonly groupRepository: IGroupRepository) {}

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
      const groupExists = await this.groupRepository.getGroupById(data.groupId);
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

  async updateMural(data: Mural, id: string): Promise<HttpResponse<Mural>> {
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

  async removeMural(id: string): Promise<HttpResponse<Mural>>{
    try {
      const existsMural = await this.muralRepository.getMuralById(id);
      if (!existsMural) return {
        statusCode: 404,
          body: "Mural not found."
      }

      await this.muralRepository.removeMural(id);

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
}