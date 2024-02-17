"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberService = void 0;
const groupService_1 = require("./groupService");
const muralService_1 = require("./muralService");
const groupRepository_1 = require("../repositories/groupRepository");
const muralRepository_1 = require("../repositories/muralRepository");
class MemberService {
    memberRepository;
    _groupRepository;
    _muralRepository;
    constructor(memberRepository) {
        this.memberRepository = memberRepository;
        this._groupRepository = new groupRepository_1.GroupRepository();
        this._muralRepository = new muralRepository_1.MuralRepository();
    }
    async getAllMembers() {
        try {
            const members = await this.memberRepository.getAllMembers();
            if (!members)
                return {
                    statusCode: 404,
                    body: "Members not found."
                };
            return {
                statusCode: 200,
                body: members
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async addMemberToMural(userId, code) {
        try {
            const [groupId, muralId] = code.split("!");
            const { statusCode, body: existGroup } = await new groupService_1.GroupService(this._groupRepository).getGroupById(groupId);
            if (statusCode !== 200)
                return {
                    statusCode: statusCode,
                    body: "Invalid code."
                };
            if (!existGroup)
                return {
                    statusCode: 400,
                    body: "Invalid code."
                };
            const { statusCode: status, body: muralsGroup } = await new muralService_1.MuralService(this._muralRepository).getMuralsByGroupId(groupId);
            if (status !== 200 || typeof (muralsGroup) === "string")
                return {
                    statusCode: statusCode,
                    body: `${muralsGroup}`
                };
            let category = "";
            for (let i = 0; i < muralsGroup.length + 1; i++) {
                if (muralsGroup[i].id === Number(muralId)) {
                    category = muralsGroup[i].category;
                    break;
                }
                if (i === muralsGroup.length) {
                    return {
                        statusCode: 404,
                        body: "Invalid code."
                    };
                }
            }
            const userGroupAlreadyExist = await this.memberRepository.getMemberByUserId(groupId);
            if (userGroupAlreadyExist)
                return {
                    statusCode: 400,
                    body: "Member already exists."
                };
            await this.memberRepository.createMember(category, userId, groupId);
            return {
                statusCode: 201,
                body: "Member created successfully."
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async updateMember(category, idMember) {
        try {
            const memberExists = await this.memberRepository.getMemberById(idMember);
            if (!memberExists)
                return {
                    statusCode: 404,
                    body: "Member not found."
                };
            if (!category.trim()) {
                return {
                    statusCode: 400,
                    body: "The field category is required."
                };
            }
            await this.memberRepository.updateMember(category, idMember);
            return {
                statusCode: 200,
                body: "Member updated successfully."
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async removeMember(idMember) {
        try {
            const memberExists = await this.memberRepository.getMemberById(idMember);
            if (!memberExists)
                return {
                    statusCode: 404,
                    body: "Member not found."
                };
            await this.memberRepository.removeMember(idMember);
            return {
                statusCode: 200,
                body: "Member deleted successfully."
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
}
exports.MemberService = MemberService;
