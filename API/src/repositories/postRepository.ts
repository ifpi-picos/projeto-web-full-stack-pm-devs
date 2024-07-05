import { Post, PrismaClient } from "@prisma/client";
import { IPostRepository } from "../interfaces/postInterface";

const prisma = new PrismaClient();

export class PostRepository implements IPostRepository {
  async getAllPosts(): Promise<Post[]> {
    try {
      return await prisma.post.findMany();
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async getPostById(id: string): Promise<Post | null> {
    try {
      return await prisma.post.findUnique({
        where: {
          id
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async getPostByMuralId(muralId: number): Promise<Post[]> {
    try {
      return await prisma.post.findMany({
        where: {
          muralId
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async addPost({ content, media, memberId, muralId }: Post): Promise<Post | null> {
    try {
      return await prisma.post.create({
        data: {
          content,
          media,
          created_at: new Date(),
          memberId,
          muralId
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async updatePost(id: string, { content, media }: Post): Promise<Post | null> {
    try {
      return await prisma.post.update({
        where: {
          id
        },
        data: {
          content,
          media
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  async removePost(id: string): Promise<Post | null> {
    try {
      return await prisma.post.delete({
        where: {
          id
        }
      })
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}