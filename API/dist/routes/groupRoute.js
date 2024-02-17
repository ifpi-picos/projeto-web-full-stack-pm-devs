"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const groupService_1 = require("../services/groupService");
const groupRepository_1 = require("../repositories/groupRepository");
const router = (0, express_1.Router)();
const repositoryGroup = new groupRepository_1.GroupRepository();
router.get("/", async (req, res) => {
    const { statusCode, body } = await new groupService_1.GroupService(repositoryGroup).getAllGroups();
    res.status(statusCode).json(body);
});
router.get("/:id/murals", async (req, res) => {
    const { id } = req.params;
    const { statusCode, body } = await new groupService_1.GroupService(repositoryGroup).getGroupMurals(id);
    res.status(statusCode).json(body);
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { statusCode, body } = await new groupService_1.GroupService(repositoryGroup).getGroupByUserId(id);
    res.status(statusCode).json(body);
});
router.post("/", async (req, res) => {
    const group = req.body;
    const requiredProps = ["name", "userId", "imgGroup"];
    for (const prop of requiredProps) {
        if (!group[prop] || !group[prop].trim()) {
            return res.status(400).json(`The field ${prop} is required.`);
        }
    }
    const { statusCode, body } = await new groupService_1.GroupService(repositoryGroup).createGroup(group.name, group.userId, group.imgGroup);
    res.status(statusCode).json(body);
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const group = req.body;
    const requiredProps = ["name"];
    for (const prop of requiredProps) {
        if (!group[prop] || !group[prop].trim()) {
            return res.status(400).json(`The field ${prop} is required.`);
        }
    }
    const { statusCode, body } = await new groupService_1.GroupService(repositoryGroup).updateGroup(group.name, group.imgGroup, id);
    res.status(statusCode).json(body);
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { statusCode, body } = await new groupService_1.GroupService(repositoryGroup).removeGroup(id);
    res.status(statusCode).json(body);
});
exports.default = router;
