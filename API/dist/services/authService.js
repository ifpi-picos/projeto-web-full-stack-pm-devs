"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.generateToken = exports.compareHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const compareHash = async (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.compareHash = compareHash;
const generateToken = (id) => {
    const SECRET = process.env.JWT_SECRET_KEY || "SECRET";
    const token = jsonwebtoken_1.default.sign({
        id: id,
    }, SECRET, { expiresIn: "1h" });
    return token;
};
exports.generateToken = generateToken;
class AuthService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async login(email, password) {
        try {
            const user = await this.userRepository.getUserByEmail(email);
            if (!user)
                return {
                    statusCode: 400,
                    body: "User not registered."
                };
            const current = user;
            const matchPassword = await (0, exports.compareHash)(password, current.password);
            if (!matchPassword)
                return {
                    statusCode: 400,
                    body: "Incorrect password."
                };
            const { password: currentPass, ...currentWithoutPassword } = current;
            currentPass;
            const token = (0, exports.generateToken)(user.id);
            return {
                statusCode: 200,
                body: currentWithoutPassword,
                cookies: token
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
exports.AuthService = AuthService;
