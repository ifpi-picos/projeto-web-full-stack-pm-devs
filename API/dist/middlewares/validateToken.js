"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = async (req, res, next) => {
    try {
        const token = req.cookies ? req.cookies.token : null;
        if (!token) {
            return res.status(403).send({
                auth: false, message: 'No token provided.'
            });
        }
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "SECRET";
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET_KEY);
        req.userId = decoded;
        next();
    }
    catch (error) {
        res.status(401).send("Token not valid.");
    }
};
exports.validateToken = validateToken;
