"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Services and Repositories
const userRepository_1 = require("../repositories/userRepository");
const userService_1 = require("../services/userService");
// Middleware
const validateToken_1 = require("../middlewares/validateToken");
const router = (0, express_1.Router)();
const repositoryUser = new userRepository_1.UserRepository();
router.get("/", async (req, res) => {
    try {
        const { statusCode, body } = await new userService_1.UserService(repositoryUser).getAllUsers();
        res.status(statusCode).json(body);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { statusCode, body } = await new userService_1.UserService(repositoryUser).getUserById(id);
        res.status(statusCode).json(body);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
router.post("/", async (req, res) => {
    try {
        const data = req.body;
        const requiredFields = [
            "name",
            "username",
            "email",
            "password",
            "confirmPassword",
            "isAdmin",
        ];
        for (const field of requiredFields) {
            if (data[field] === null || data[field] === undefined || data[field]?.toString().trim() === "") {
                return res.status(400).json(`The field ${field} is required.`);
            }
        }
        if (data.password !== data.confirmPassword)
            return res.status(400).json("Passwords do not match.");
        if (data.password.length < 8)
            return res
                .status(400)
                .json("The password needs at least eight characters.");
        const { statusCode, body } = await new userService_1.UserService(repositoryUser).addUser(data);
        res.status(statusCode).json(body);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const user = req.body;
    const { statusCode, body } = await new userService_1.UserService(repositoryUser).updateUser(id, user);
    res.status(statusCode).json(body);
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { statusCode, body } = await new userService_1.UserService(repositoryUser).removeUser(id);
    res.status(statusCode).json(body);
});
router.post("/token", validateToken_1.validateToken, async (req, res) => {
    const userId = req.userId;
    res.send(userId);
});
exports.default = router;
