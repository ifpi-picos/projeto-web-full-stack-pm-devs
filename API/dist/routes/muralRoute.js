"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const muralService_1 = require("../services/muralService");
const muralRepository_1 = require("../repositories/muralRepository");
const router = (0, express_1.Router)();
const repositoryMural = new muralRepository_1.MuralRepository();
router.get("/", async (req, res) => {
    const { statusCode, body } = await new muralService_1.MuralService(repositoryMural).getAllMurals();
    res.status(statusCode).json(body);
});
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { statusCode, body } = await new muralService_1.MuralService(repositoryMural).getMuralsByGroupId(id);
    res.status(statusCode).json(body);
});
router.get("/generatecode/:id", async (req, res) => {
    const { id } = req.params;
    const { groupId } = req.body;
    if (!id || !id.trim())
        return res.status(400).json("Param MuralId is required.");
    if (!groupId || !groupId.trim())
        return res.status(400).json("GroupId is required.");
    const { statusCode, body } = await new muralService_1.MuralService(repositoryMural).generateCode(groupId, Number(id));
    res.status(statusCode).json(body);
});
router.post("/", async (req, res) => {
    const data = req.body;
    const requiredFields = ["name", "category", "groupId", "imgMural"];
    for (const field of requiredFields) {
        if (!data[field] || !data[field].trim()) {
            return res.status(400).json(`The field ${field} id required.`);
        }
    }
    const { statusCode, body } = await new muralService_1.MuralService(repositoryMural).createMural(data);
    res.status(statusCode).json(body);
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { statusCode, body } = await new muralService_1.MuralService(repositoryMural).updateMural(data, parseInt(id));
    res.status(statusCode).json(body);
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { statusCode, body } = await new muralService_1.MuralService(repositoryMural).removeMural(parseInt(id));
    res.status(statusCode).json(body);
});
exports.default = router;
