"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const memberService_1 = require("../services/memberService");
const memberRepository_1 = require("../repositories/memberRepository");
const router = (0, express_1.Router)();
const repositoryMember = new memberRepository_1.MemberRepository();
router.get("/", async (req, res) => {
    const { statusCode, body } = await new memberService_1.MemberService(repositoryMember).getAllMembers();
    res.status(statusCode).json(body);
});
router.post("/:id", async (req, res) => {
    const { id } = req.params;
    const { code } = req.body;
    const { statusCode, body } = await new memberService_1.MemberService(repositoryMember).addMemberToMural(id, code);
    res.status(statusCode).json(body);
});
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;
    if (!category.trim()) {
        return res.status(400).json("The field category is required.");
    }
    const { statusCode, body } = await new memberService_1.MemberService(repositoryMember).updateMember(id, category);
    res.status(statusCode).json(body);
});
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { statusCode, body } = await new memberService_1.MemberService(repositoryMember).removeMember(id);
    res.status(statusCode).json(body);
});
exports.default = router;
