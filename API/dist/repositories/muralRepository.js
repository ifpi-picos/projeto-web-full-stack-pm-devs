"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuralRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MuralRepository {
    async getAllMurals() {
        try {
            return await prisma.mural.findMany();
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async getMuralById(muralId) {
        try {
            return await prisma.mural.findUnique({
                where: {
                    id: muralId,
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async getMuralsByGroupId(groupId) {
        try {
            return await prisma.mural.findMany({
                where: {
                    groupId
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async createMural({ name, category, groupId, imgMural }) {
        try {
            return await prisma.mural.create({
                data: {
                    name,
                    category: category,
                    imgMural,
                    groupId,
                    created_at: new Date(),
                },
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async updateMural({ name, category, imgMural }, id) {
        try {
            return await prisma.mural.update({
                where: {
                    id
                },
                data: {
                    name,
                    category: category,
                    imgMural
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async removeMural(muralId) {
        try {
            return await prisma.mural.delete({
                where: {
                    id: muralId
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.MuralRepository = MuralRepository;
