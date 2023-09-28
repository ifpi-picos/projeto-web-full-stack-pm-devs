import { Member } from "@prisma/client";
import { HttpResponse } from "../interfaces/interfaces";
import { IMemberRepository, IMemberService } from "../interfaces/memberInterface";
import { IGroupRepository } from "../interfaces/groupInterface";
import { IMuralRepository } from "../interfaces/muralInterface";



export class MemberService implements IMemberService {
  constructor(private readonly memberRepository: IMemberRepository, private readonly groupRepository: IGroupRepository, private readonly muralRepository: IMuralRepository) {}

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

      const existGroup = await this.groupRepository.getGroupById(groupId);
      if(!existGroup) return {
        statusCode: 400,
        body: "Invalid code."
      }

      let category = "";
      const muralsGroup = await this.muralRepository.getMuralsByGroupId(groupId);
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

      const userMemberAlreadyExists = await this.memberRepository.getMemberByUserId(userId);
      if(userMemberAlreadyExists) return {
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