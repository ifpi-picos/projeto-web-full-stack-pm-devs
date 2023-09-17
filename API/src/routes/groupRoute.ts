import { Request, Response, Router } from 'express';
import { Group } from '../models/Group';
import { GroupService } from '../services/groupServices';
import { GroupRepository } from '../repositories/groupRepository';
import { UserRepository } from '../repositories/userRepository';

const router = Router();

const repositoryGroup = new GroupRepository();
const repositoryUser = new UserRepository();

router.get("/", async (req: Request, res: Response) => {
  const { statusCode, body } = await new GroupService(repositoryGroup, repositoryUser).getAllGroups();
  res.status(statusCode).json(body);
})

router.post("/", async (req: Request, res: Response) => {
  const group = req.body;

  const requiredProps: (keyof Group)[] = ["name", "userId"];

  for(const prop of requiredProps) {
    if(!group[prop] || !group[prop].trim()){
      return res.status(400).json(`O campo ${prop} é obrigatório.`)
    }
  }

  const { statusCode, body } = await new GroupService(repositoryGroup, repositoryUser).createGroup(group.name, group.userId);
  res.status(statusCode).json(body);
})



export default router;