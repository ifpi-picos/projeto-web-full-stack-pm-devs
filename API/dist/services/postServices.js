"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
class PostService {
    postRepository;
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async getAllPosts() {
        try {
            const posts = await this.postRepository.getAllPosts();
            if (!posts)
                return {
                    statusCode: 404,
                    body: "Posts not found."
                };
            return {
                statusCode: 200,
                body: posts
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async getPostById(id) {
        try {
            const post = await this.postRepository.getPostById(id);
            if (!post)
                return {
                    statusCode: 404,
                    body: "Post not found."
                };
            return {
                statusCode: 200,
                body: post
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async addPost(dataPost) {
        try {
            const post = await this.postRepository.addPost(dataPost);
            if (!post)
                return {
                    statusCode: 400,
                    body: "Post not created."
                };
            return {
                statusCode: 201,
                body: "Post created successfully."
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async updatePost(id, dataPost) {
        try {
            const postExists = await this.getPostById(id);
            if (postExists.statusCode !== 200)
                return {
                    statusCode: 404,
                    body: "Post not found."
                };
            await this.postRepository.updatePost(id, dataPost);
            return {
                statusCode: 200,
                body: "Post updated successfully."
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async removePost(id) {
        try {
            const postExists = await this.getPostById(id);
            if (postExists.statusCode !== 200)
                return {
                    statusCode: 404,
                    body: "Post not found."
                };
            await this.postRepository.removePost(id);
            return {
                statusCode: 200,
                body: "Post deleted successfully."
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
exports.PostService = PostService;
