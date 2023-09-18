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

router.post("/", async (req: Request, res: Response) => {
  const data: Mural = req.body;
  const { statusCode, body } = await new MuralService(repositoryMural).createMural(data);
  res.status(statusCode).json(body);
})

export default router;