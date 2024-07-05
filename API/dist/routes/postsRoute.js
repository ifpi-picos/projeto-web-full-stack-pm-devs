"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postServices_1 = require("../services/postServices");
const postRepository_1 = require("../repositories/postRepository");
const router = (0, express_1.Router)();
const repositoryPost = new postRepository_1.PostRepository();
router.get("/", async (req, res) => {
    const { statusCode, body } = await new postServices_1.PostService(repositoryPost).getAllPosts();
    res.status(statusCode).json(body);
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { statusCode, body } = await new postServices_1.PostService(repositoryPost).getPostById(id);
        res.status(statusCode).json(body);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { statusCode, body } = await new postServices_1.PostService(repositoryPost).getPostByMuralId(parseInt(id));
    res.status(statusCode).json(body);
});
router.post("/", async (req, res) => {
    const data = req.body;
    const requiredFields = ["id", "content", "memberId", "muralId"];
    for (const field of requiredFields) {
        if (!data[field] || !data[field].toString().trim()) {
            return res.status(400).json(`The field ${field} id required.`);
        }
    }
    const { statusCode, body } = await new postServices_1.PostService(repositoryPost).addPost(data);
    res.status(statusCode).json(body);
});
router.put("/mural/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { statusCode, body } = await new postServices_1.PostService(repositoryPost).updatePost(id, data);
    res.status(statusCode).json(body);
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { statusCode, body } = await new postServices_1.PostService(repositoryPost).removePost(id);
    res.status(statusCode).json(body);
});
exports.default = router;
