"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Services and Repositories
const userRepository_1 = require("../repositories/userRepository");
// Services
const authService_1 = require("../services/authService");
const userService_1 = require("../services/userService");
const router = (0, express_1.Router)();
const repositoryUser = new userRepository_1.UserRepository();
router.post("/login", async (req, res) => {
    try {
        const user = req.body;
        const requiredFields = [
            "email",
            "password",
        ];
        for (const field of requiredFields) {
            if (!user[field] || user[field].toString().trim() === "") {
                return res.status(400).json(`The field ${field} is required.`);
            }
        }
        const repositoryUser = await new userRepository_1.UserRepository();
        const { statusCode, body, cookies } = await new authService_1.AuthService(repositoryUser).login(user.email, user.password);
        res.cookie("token", cookies, { maxAge: 3600000, httpOnly: true });
        res.status(statusCode).json({ auth: statusCode === 200 ? true : false, data: body });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
router.post("/register", async (req, res) => {
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
exports.default = router;
