import { Post } from "@prisma/client";
import { HttpResponse } from "./interfaces";

export interface IPostRepository {
  getAllPosts(): Promise<Post[]>;
  getPostById(id: string): Promise<Post | null>;
  addPost(Post: Post): Promise<Post | null>;
  updatePost(id: string, Post: Post): Promise<Post | null>;
  removePost(id: string): Promise<Post | null>;
}

export interface IPostService {
  getAllPosts(): Promise<HttpResponse<Post[]>>;
  getPostById(id: string): Promise<HttpResponse<Post>>;
  addPost(data: Post): Promise<HttpResponse<Post>>;
  updatePost(id: string, dataPost: Post): Promise<HttpResponse<Post>>;
  removePost(id: string): Promise<HttpResponse<Post>>;
}
