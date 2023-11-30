import { Member } from "@prisma/client";
import { HttpResponse } from "../interfaces/interfaces";
import { IMemberRepository, IMemberService } from "../interfaces/memberInterface";
import { IGroupRepository } from "../interfaces/groupInterface";
import { IMuralRepository } from "../interfaces/muralInterface";
import { GroupService } from "./groupService";
import { MuralService } from "./muralService";
import { GroupRepository } from "../repositories/groupRepository";
import { MuralRepository } from "../repositories/muralRepository";



export class MemberService implements IMemberService {
  private _groupRepository: IGroupRepository;
  private _muralRepository: IMuralRepository;

  constructor(private readonly memberRepository: IMemberRepository) {
    this._groupRepository = new GroupRepository();
    this._muralRepository = new MuralRepository();
  }

  async getAllMembers(): Promise<HttpResponse<Member[]>> {
    try {
     const members = await this.memberRepository.getAllMembers();
       if(!members) return {
         statusCode: 404,
         body: "Members not found."
       }
       
       return {
         statusCode: 200,
         body: members
       }
    } catch (error) {
     return {
       statusCode: 500,
       body: `Error: ${error}`
     }
    } 
   }

  async addMemberToMural(userId: string, code: string): Promise<HttpResponse<Member>> {
    try {
      const [groupId, muralId] = code.split("!")

      const { statusCode, body: existGroup } = await new GroupService(this._groupRepository).getGroupById(groupId);

      if(statusCode !== 200) return {
        statusCode: statusCode,
        body: "Invalid code."
      }

      if(!existGroup) return {
        statusCode: 400,
        body: "Invalid code."
      }

      const { statusCode: status, body: muralsGroup } = await new MuralService(this._muralRepository).getMuralsByGroupId(groupId);
      
      if(status !== 200 || typeof(muralsGroup) === "string") return {
        statusCode: statusCode,
        body: `${muralsGroup}`
      }
      
      let category = "";
      for(let i = 0; i < muralsGroup.length + 1; i++) {
        if(muralsGroup[i].id === Number(muralId)){
          category = muralsGroup[i].category;
          break;
        }

        if(i === muralsGroup.length) {
          return {
            statusCode: 404,
            body: "Invalid code."
          }
        }
      }

      const userGroupAlreadyExist = await this.memberRepository.getMemberByUserId(groupId)
      if(userGroupAlreadyExist) return {
        statusCode: 400,
        body: "Member already exists."
      }

      await this.memberRepository.createMember(category, userId, groupId);

      return {
        statusCode: 201,
        body: "Member created successfully."
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }

  async updateMember(category: string, idMember: string): Promise<HttpResponse<Member>> {
    try {
      const memberExists = await this.memberRepository.getMemberById(idMember);
      if(!memberExists) return {
        statusCode: 404,
        body: "Member not found."
      }

      if(!category.trim()) {
        return {
          statusCode: 400,
          body: "The field category is required."
        }
      }

      await this.memberRepository.updateMember(category, idMember);

      return {
        statusCode: 200,
        body: "Member updated successfully."
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }

  async removeMember(idMember: string): Promise<HttpResponse<Member>> {
    try {
      const memberExists = await this.memberRepository.getMemberById(idMember);
      if(!memberExists) return {
        statusCode: 404,
        body: "Member not found."
      }

      await this.memberRepository.removeMember(idMember);

      return {
        statusCode: 200,
        body: "Member deleted successfully."
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: `Error: ${error}`
      }
    }
  }
}