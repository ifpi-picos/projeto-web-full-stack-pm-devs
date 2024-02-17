"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuralService = void 0;
const groupRepository_1 = require("../repositories/groupRepository");
const groupService_1 = require("./groupService");
class MuralService {
    muralRepository;
    _groupRepository;
    constructor(muralRepository) {
        this.muralRepository = muralRepository;
        this._groupRepository = new groupRepository_1.GroupRepository();
    }
    async getAllMurals() {
        try {
            const murals = await this.muralRepository.getAllMurals();
            if (!murals)
                return {
                    statusCode: 404,
                    body: "Murals not found."
                };
            return {
                statusCode: 200,
                body: murals
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async getMuralsByGroupId(groupId) {
        try {
            const murals = await this.muralRepository.getMuralsByGroupId(groupId);
            if (!murals || murals.length <= 0)
                return {
                    statusCode: 400,
                    body: "Murals not found."
                };
            return {
                statusCode: 200,
                body: murals
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async createMural(data) {
        try {
            const groupExists = await new groupService_1.GroupService(this._groupRepository).getGroupById(data.groupId);
            if (!groupExists)
                return {
                    statusCode: 404,
                    body: "Group not found."
                };
            const murals = await this.muralRepository.getMuralsByGroupId(data.groupId);
            for (const unit of murals) {
                if (unit.category === data.category.toLocaleLowerCase())
                    return {
                        statusCode: 400,
                        body: "Category already registered."
                    };
            }
            data.category = data.category.toLowerCase();
            const mural = await this.muralRepository.createMural(data);
            if (!mural)
                return {
                    statusCode: 400,
                    body: "Mural not created."
                };
            return {
                statusCode: 201,
                body: "Mural created successfully."
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async updateMural(data, id) {
        try {
            const existsMural = await this.muralRepository.getMuralById(id);
            if (!existsMural)
                return {
                    statusCode: 404,
                    body: "Mural not found."
                };
            const murals = await this.muralRepository.getMuralsByGroupId(data.groupId);
            for (const unit of murals) {
                if (unit.category === data.category.toLocaleLowerCase())
                    return {
                        statusCode: 400,
                        body: "Category already registered."
                    };
            }
            const fields = ["name", "category"];
            for (const field of fields) {
                if (!data[field]) {
                    data[field] = existsMural[field];
                }
            }
            data.category = data.category.toLowerCase();
            await this.muralRepository.updateMural(data, id);
            return {
                statusCode: 200,
                body: "Mural updated successfully."
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async removeMural(id) {
        try {
            const existsMural = await this.muralRepository.getMuralById(id);
            if (!existsMural)
                return {
                    statusCode: 404,
                    body: "Mural not found."
                };
            const res = await this.muralRepository.removeMural(id);
            console.log(res);
            return {
                statusCode: 200,
                body: "Mural deleted successfully."
            };
        }
        catch (error) {
            return {
                statusCode: 500,
                body: `Error: ${error}`
            };
        }
    }
    async generateCode(groupId, muralId) {
        try {
            const { statusCode, body: groupExists } = await new groupService_1.GroupService(this._groupRepository).getGroupById(groupId);
            if (statusCode !== 200 && typeof (groupExists) === "string")
                return {
                    statusCode: statusCode,
                    body: groupExists
                };
            const muralExists = await this.muralRepository.getMuralById(muralId);
            if (!muralExists)
                return {
                    statusCode: 404,
                    body: "Mural not found."
                };
            const code = `${groupId}` + "!" + `${muralId}`;
            return {
                statusCode: 200,
                body: code
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
exports.MuralService = MuralService;
