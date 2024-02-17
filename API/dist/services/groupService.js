"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupService = void 0;
const muralService_1 = require("./muralService");
const userService_1 = require("./userService");
const muralRepository_1 = require("../repositories/muralRepository");
const userRepository_1 = require("../repositories/userRepository");
class GroupService {
    groupRepository;
    _muralRepository;
    _userRepository;
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
        this._userRepository = new userRepository_1.UserRepository();
        this._muralRepository = new muralRepository_1.MuralRepository();
    }
    async getAllGroups() {
        try {
            const groups = await this.groupRepository.getAllGroups();
            if (!groups)
                return {
                    statusCode: 400,
                    body: "Groups not registered."
                };
            return {
                statusCode: 200,
                body: groups
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
    async getGroupById(groupId) {
        try {
            const group = await this.groupRepository.getGroupById(groupId);
            if (!group)
                return {
                    statusCode: 404,
                    body: "Group not found."
                };
            return {
                statusCode: 200,
                body: group
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
    async getGroupByUserId(userId) {
        try {
            const group = await this.groupRepository.getGroupByUserId(userId);
            if (!group)
                return {
                    statusCode: 404,
                    body: "Group not found."
                };
            return {
                statusCode: 200,
                body: group
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
    async getGroupMurals(userId) {
        try {
            const group = await this.groupRepository.getGroupByUserId(userId);
            if (!group)
                return {
                    statusCode: 404,
                    body: "Group not found."
                };
            const { statusCode, body: murals } = await new muralService_1.MuralService(this._muralRepository).getMuralsByGroupId(group.id);
            if (statusCode !== 200)
                return {
                    statusCode: statusCode,
                    body: murals
                };
            return {
                statusCode: 200,
                body: murals
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
    async createGroup(name, userId, imgGroup) {
        try {
            const { statusCode, body: user } = await new userService_1.UserService(this._userRepository).getUserById(userId);
            if (statusCode !== 200 || typeof user === "string")
                return {
                    statusCode: statusCode,
                    body: `User does not exist or does not have permission.`
                };
            const userGroupExist = await this.groupRepository.getGroupByUserId(userId);
            if (userGroupExist)
                return {
                    statusCode: 400,
                    body: `User does not exist or does not have permission.`
                };
            if (!user || !user.isAdmin)
                return {
                    statusCode: 400,
                    body: `User does not exist or does not have permission.`
                };
            const group = await this.groupRepository.createGroup(name, userId, imgGroup);
            if (!group)
                return {
                    statusCode: 400,
                    body: "Group not created.",
                };
            return {
                statusCode: 201,
                body: "Group created successfully.",
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
    async updateGroup(name, userId, imgGroup) {
        try {
            const userGroup = await this.groupRepository.getGroupByUserId(userId);
            if (!userGroup)
                return {
                    statusCode: 404,
                    body: "Group not found."
                };
            await this.groupRepository.updateGroup(name, userId, imgGroup);
            return {
                statusCode: 200,
                body: "Group updated successfully."
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`,
            };
        }
    }
    async removeGroup(userId) {
        try {
            const userGroup = await this.groupRepository.getGroupByUserId(userId);
            if (!userGroup)
                return {
                    statusCode: 404,
                    body: "Group not found."
                };
            await this.groupRepository.removeGroup(userId);
            return {
                statusCode: 200,
                body: "Group removed successfully."
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
exports.GroupService = GroupService;
