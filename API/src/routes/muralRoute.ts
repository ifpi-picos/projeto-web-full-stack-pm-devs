import { Router, Request, Response } from "express";
import { MuralService } from "../services/muralService";
import { MuralRepository } from "../repositories/muralRepository";
import { GroupRepository } from "../repositories/groupRepository";
import { Mural } from "@prisma/client";

const router = Router();

const repositoryMural = new MuralRepository();
const repositoryGroup = new GroupRepository();

router.get("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await new MuralService(repositoryMural, repositoryGroup).getAllMurals();
  res.status(statusCode).json(body);
})

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statusCode, body } = await new MuralService(repositoryMural, repositoryGroup).getMuralsByGroupId(id);
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

  const { statusCode, body } = await new MuralService(repositoryMural, repositoryGroup).createMural(data);
  res.status(statusCode).json(body);
})

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const { statusCode, body } = await new MuralService(repositoryMural, repositoryGroup).updateMural(data, id);
  res.status(statusCode).json(body);
})

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statusCode, body } = await new MuralService(repositoryMural, repositoryGroup).removeMural(id);
  res.status(statusCode).json(body);
})

export default router;