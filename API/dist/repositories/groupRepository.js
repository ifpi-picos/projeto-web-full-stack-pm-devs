"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupRepository = void 0;
//
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class GroupRepository {
    async getAllGroups() {
        try {
            return await prisma.group.findMany();
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
    async getGroupById(groupId) {
        try {
            return await prisma.group.findUnique({
                where: {
                    id: groupId
                }
            });
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
    async getGroupByUserId(userId) {
        try {
            return await prisma.group.findUnique({
                where: {
                    userId: userId
                }
            });
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
    async createGroup(name, userId, imgGroup) {
        try {
            return prisma.group.create({
                data: {
                    name,
                    userId: userId,
                    created_at: new Date(),
                    imgGroup,
                },
            });
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
    async updateGroup(name, userId, imgGroup) {
        try {
            return prisma.group.update({
                where: {
                    userId
                },
                data: {
                    name,
                    imgGroup
                }
            });
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
    async removeGroup(userId) {
        try {
            return prisma.group.delete({
                where: {
                    userId
                }
            });
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
}
exports.GroupRepository = GroupRepository;
