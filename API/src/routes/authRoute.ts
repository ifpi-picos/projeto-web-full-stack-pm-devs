import { Request, Response } from "express";
import { Router } from "express";

// Models
import { User } from "../models/User";

// Services and Repositories
import { UserRepository } from "../repositories/userRepository";
import { AdminRepository } from "../repositories/adminRepository";

// Services
import { AuthService } from "../services/authService";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user: Pick<User, "email" | "password"> = req.body;

    const requiredFields: (keyof Pick<User, "email" | "password">)[] = [
      "email",
      "password",
    ];
    for (const field of requiredFields) {
      if (!user[field] || user[field].toString().trim() === "") {
        return res.status(400).json(`The field ${field} is required.`);
      }
    }

    const repositoryUser = await new UserRepository();
    const repositoryAdmin = await new AdminRepository();
    const { statusCode, body } = await new AuthService(repositoryUser, repositoryAdmin).login(
      user.email,
      user.password
    );

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


export default router;