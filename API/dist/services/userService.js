"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.hashPass = void 0;
// Authentication
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPass = async (password) => {
    const salt = process.env.BCRYPT_SALT || "10";
    const saltValue = await bcrypt_1.default.genSaltSync(parseInt(salt));
    const hash = await bcrypt_1.default.hashSync(password, saltValue);
    return hash;
};
exports.hashPass = hashPass;
class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAllUsers() {
        try {
            const users = await this.userRepository.getAllUsers();
            if (!users)
                return {
                    statusCode: 400,
                    body: "No users found.",
                };
            return {
                statusCode: 200,
                body: users,
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
    async getUserById(id) {
        try {
            const user = await this.userRepository.getUserById(id);
            if (!user)
                return {
                    statusCode: 404,
                    body: "User not found.",
                };
            const { password, ...userWithoutPass } = user;
            password;
            return {
                statusCode: 200,
                body: userWithoutPass,
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
    async addUser(data) {
        try {
            const userExistsEmail = await this.userRepository.getUserByEmail(data.email);
            const userExistsUsername = await this.userRepository.getUserByUsername(data.username);
            if (userExistsEmail || userExistsUsername)
                return {
                    statusCode: 400,
                    body: "User already exists.",
                };
            // Hash password
            data.password = await (0, exports.hashPass)(data.password);
            data.username = data.username.toLowerCase();
            await this.userRepository.addUser(data);
            return {
                statusCode: 201,
                body: "User created successfully.",
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
    async updateUser(id, dataUser) {
        try {
            const userExists = await this.userRepository.getUserById(id);
            if (!userExists)
                return {
                    statusCode: 404,
                    body: "User not found.",
                };
            const fields = ["name", "username", "password", "profile_image"];
            for (const field of fields) {
                if (!dataUser[field]) {
                    dataUser[field] = userExists[field];
                }
            }
            await this.userRepository.updateUser(id, dataUser);
            return {
                statusCode: 200,
                body: "User updated successfully.",
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
    async removeUser(id) {
        try {
            const userExists = await this.userRepository.getUserById(id);
            if (!userExists)
                return {
                    statusCode: 404,
                    body: "User not found.",
                };
            await this.userRepository.removeUser(id);
            return {
                statusCode: 200,
                body: "User deleted successfully.",
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
}
exports.UserService = UserService;
