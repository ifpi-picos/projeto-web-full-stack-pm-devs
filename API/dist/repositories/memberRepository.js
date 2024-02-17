"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MemberRepository {
    async getAllMembers() {
        try {
            return await prisma.member.findMany();
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async getMemberById(MemberId) {
        try {
            return await prisma.member.findUnique({
                where: {
                    id: MemberId
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async getMemberByUserId(userId) {
        try {
            return await prisma.member.findFirst({
                where: {
                    userId
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async createMember(category, userId, groupId) {
        try {
            return await prisma.member.create({
                data: {
                    category,
                    created_at: new Date(),
                    userId,
                    groupId
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async updateMember(category, idMember) {
        try {
            return await prisma.member.update({
                where: {
                    id: idMember,
                },
                data: {
                    category
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async removeMember(MemberId) {
        try {
            return await prisma.member.delete({
                where: {
                    id: MemberId
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.MemberRepository = MemberRepository;
