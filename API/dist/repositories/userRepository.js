"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserRepository {
    async getAllUsers() {
        try {
            return await prisma.user.findMany();
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
    async getUserById(id) {
        try {
            return await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
    async getUserByEmail(email) {
        try {
            return await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
    async getUserByUsername(username) {
        try {
            return await prisma.user.findUnique({
                where: {
                    username
                },
            });
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
    async addUser({ name, username, email, password, isAdmin }) {
        try {
            return await prisma.user.create({
                data: {
                    name,
                    username,
                    email,
                    password,
                    profile_image: "",
                    isAdmin,
                    created_at: new Date(),
                },
            });
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
    async updateUser(id, { name, username, password, profile_image }) {
        return await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name,
                username,
                password,
                profile_image
            }
        });
    }
    async removeUser(id) {
        try {
            return await prisma.user.delete({
                where: {
                    id: id
                }
            });
        }
        catch (error) {
            throw new Error(`error: ${error}`);
        }
    }
}
exports.UserRepository = UserRepository;
