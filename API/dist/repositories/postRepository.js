"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class PostRepository {
    async getAllPosts() {
        try {
            return await prisma.post.findMany();
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async getPostById(id) {
        try {
            return await prisma.post.findUnique({
                where: {
                    id
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async getPostByMuralId(muralId) {
        try {
            return await prisma.post.findMany({
                where: {
                    muralId
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async addPost({ content, media, memberId, muralId }) {
        try {
            return await prisma.post.create({
                data: {
                    content,
                    media,
                    created_at: new Date(),
                    memberId,
                    muralId
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async updatePost(id, { content, media }) {
        try {
            return await prisma.post.update({
                where: {
                    id
                },
                data: {
                    content,
                    media
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
    async removePost(id) {
        try {
            return await prisma.post.delete({
                where: {
                    id
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.PostRepository = PostRepository;
