import { Mural } from "@prisma/client";
import { HttpResponse } from "../interfaces/interfaces";
import { IMuralRepository, IMuralService } from "../interfaces/muralInterface";


export class MuralService implements IMuralService {
  constructor(private readonly muralRepository: IMuralRepository) {}

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
      if(!murals) return {
        statusCode: 400,
        body: "Mrals not found."
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
  
  async createMural(data: Mural): Promise<HttpResponse<Mural>> {
    try {
      const murals = await this.muralRepository.getAllMurals();
      for(const unit of murals) {
        if(unit.category === data.category) return {
          statusCode: 400,
          body: "Category already registered."
        }
      }

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
}