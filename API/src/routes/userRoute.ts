import { Request, Response } from "express";
import { Router } from "express";

// Models
import { User } from "../models/User";

// Services and Repositories
import { userRepository } from "../repositories/userRepository";
import { userService } from "../services/userServices";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const repository = await new userRepository();
    const { statusCode, body } = await new userService(
      repository
    ).getAllUsers();

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const repository = await new userRepository();
    const { statusCode, body } = await new userService(repository).getUserById(
      id
    );

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const user: User = req.body;

    const requiredFields: (keyof User)[] = [
      "name",
      "username",
      "email",
      "password",
      "confirmPassword",
    ];
    for (const field of requiredFields) {
      if (!user[field] || user[field]?.toString().trim() === "") {
        return res.status(400).json(`The field ${field} is required.`);
      }
    }

    if (user.password !== user.confirmPassword)
      return res.status(400).json("Passwords do not match.");
    if (user.password.length < 8)
      return res
        .status(400)
        .json("The password needs at least eight characters.");

    const repository = await new userRepository();
    const { statusCode, body } = await new userService(repository).addUser(user);

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
