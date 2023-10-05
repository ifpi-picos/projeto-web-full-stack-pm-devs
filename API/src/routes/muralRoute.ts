import { Router, Request, Response } from "express";
import { MuralService } from "../services/muralService";
import { MuralRepository } from "../repositories/muralRepository";
import { Mural } from "@prisma/client";

const router = Router();

const repositoryMural = new MuralRepository();

router.get("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await new MuralService(repositoryMural).getAllMurals();
  res.status(statusCode).json(body);
})

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statusCode, body } = await new MuralService(repositoryMural).getMuralsByGroupId(id);
  res.status(statusCode).json(body);
})

router.get("/generatecode/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { groupId }: { groupId: string } = req.body;

  if(!id || !id.trim()) return res.status(400).json("Param MuralId is required.")
  if(!groupId || !groupId.trim()) return res.status(400).json("GroupId is required.")

  const { statusCode, body } = await new MuralService(repositoryMural).generateCode(groupId, Number(id));
  res.status(statusCode).json(body);
})

router.post("/", async (req: Request, res: Response) => {
  const data: Pick<Mural, "name" | "category" | "groupId"> = req.body;

  const requiredFields: (keyof Pick<Mural, "name" | "category" | "groupId">)[] = ["name", "category", "groupId"]
  for(const field of requiredFields) {
    if(!data[field] || !data[field].trim()) {
    return res.status(400).json(`The field ${field} id required.`)
    }
  }

  const { statusCode, body } = await new MuralService(repositoryMural).createMural(data);
  res.status(statusCode).json(body);
})

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const { statusCode, body } = await new MuralService(repositoryMural).updateMural(data, parseInt(id));
  res.status(statusCode).json(body);
})

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statusCode, body } = await new MuralService(repositoryMural).removeMural(parseInt(id));
  res.status(statusCode).json(body);
})

export default router;