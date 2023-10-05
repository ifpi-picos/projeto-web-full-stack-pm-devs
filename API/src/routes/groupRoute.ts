import { Request, Response, Router } from 'express';
import { Group } from '../models/Group';
import { GroupService } from '../services/groupService';
import { GroupRepository } from '../repositories/groupRepository';

const router = Router();

const repositoryGroup = new GroupRepository();

router.get("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await new GroupService(repositoryGroup).getAllGroups();
  res.status(statusCode).json(body);
})

router.get("/:id/murals", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statusCode, body } = await new GroupService(repositoryGroup).getGroupMurals(id);
  res.status(statusCode).json(body);
})

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statusCode, body } = await new GroupService(repositoryGroup).getGroupByUserId(id);
  res.status(statusCode).json(body);
})

router.post("/", async (req: Request, res: Response) => {
  const group = req.body;

  const requiredProps: (keyof Group)[] = ["name", "userId"];

  for(const prop of requiredProps) {
    if(!group[prop] || !group[prop].trim()){
      return res.status(400).json(`The field ${prop} is required.`)
    }
  }

  const { statusCode, body } = await new GroupService(repositoryGroup).createGroup(group.name, group.userId);
  res.status(statusCode).json(body);
})

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const group = req.body;
  

  const requiredProps: (keyof Group)[] = ["name"];

  for(const prop of requiredProps) {
    if(!group[prop] || !group[prop].trim()){
      return res.status(400).json(`The field ${prop} is required.`)
    }
  }

  const { statusCode, body } = await new GroupService(repositoryGroup).updateGroup(group.name, id);
  res.status(statusCode).json(body);
})

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const { statusCode, body } = await new GroupService(repositoryGroup).removeGroup(id);
  res.status(statusCode).json(body);
})

export default router;