import { Request, Response } from "express";
import { Router } from "express";

// tsoa
// import {
//   Body,
//   Controller,
//   Get,
//   Path,
//   Post,
//   Query,
//   Route,
//   SuccessResponse,
// } from "tsoa";

// Models
import { User } from "../models/User";

// Services and Repositories
import { UserRepository } from "../repositories/userRepository";
import { UserService } from "../services/userService";

// Middleware
import { CustomRequest, validateToken } from "../middlewares/validateToken";

const router = Router();

const repositoryUser = new UserRepository();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { statusCode, body } = await new UserService(
      repositoryUser
    ).getAllUsers();

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { statusCode, body } = await new UserService(
      repositoryUser
    ).getUserById(id);

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// router.get("/groups/:id", async (req: Request, res: Response) => {
//   const { id } = req.params;

// })

router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const requiredFields: (keyof User)[] = [
      "name",
      "username",
      "email",
      "password",
      "confirmPassword",
      "isAdmin",
    ];
    for (const field of requiredFields) {
      const namedGroup: (keyof {groupName: string}) = "groupName"

      if(data["isAdmin"] && !data[namedGroup]) {
        return res.status(400).json(`The field groupName is required.`);
      }


      if (data[field] === null || data[field] === undefined || data[field]?.toString().trim() === "") {
        return res.status(400).json(`The field ${field} is required.`);
      }
    }

    if (data.password !== data.confirmPassword)
      return res.status(400).json("Passwords do not match.");
    if (data.password.length < 8)
      return res
        .status(400)
        .json("The password needs at least eight characters.");

    const { statusCode, body } = await new UserService(
      repositoryUser
    ).addUser(data);

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.body;
  const { statusCode, body } = await new UserService(
    repositoryUser
  ).updateUser(id, user);

  res.status(statusCode).json(body);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { statusCode, body } = await new UserService(
    repositoryUser
  ).removeUser(id);

  res.status(statusCode).json(body);
});

router.post("/token", validateToken, async (req: Request, res: Response) => {
  const user = (req as CustomRequest).user;
  res.send(user);
});

export default router;
