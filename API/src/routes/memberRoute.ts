import { Request, Response, Router } from 'express';
import { MemberService } from '../services/memberService';
import { MemberRepository } from '../repositories/memberRepository';
import { Member } from '@prisma/client';

const router = Router();

const repositoryMember = new MemberRepository()

router.get("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await new MemberService(repositoryMember).getAllMembers();
  res.status(statusCode).json(body);
})

router.post("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { code } = req.body;
  const { statusCode, body } = await new MemberService(repositoryMember).addMemberToMural(id, code);
  res.status(statusCode).json(body);
})

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { category }: Pick<Member, "category"> = req.body;

  if(!category.trim()){
    return res.status(400).json("The field category is required.");
  }

  const { statusCode, body } = await new MemberService(repositoryMember).updateMember(id, category);
  res.status(statusCode).json(body);
})

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statusCode, body } = await new MemberService(repositoryMember).removeMember(id);
  res.status(statusCode).json(body);
})


export default router;