import { Request, Response } from "express";
import { Router } from "express";

// Models
import { User } from "../models/User";

// Services and Repositories
import { UserRepository } from "../repositories/userRepository";

// Services
import { AuthService } from "../services/authService";
import { UserService } from "../services/userService";

const router = Router();

const repositoryUser = new UserRepository();

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
    const { statusCode, body, cookies } = await new AuthService(repositoryUser).login(
      user.email,
      user.password
    );
    
    res.cookie("token", cookies, { maxAge: 3600000, httpOnly: true });
    res.status(statusCode).json({ auth: statusCode === 200 ? true : false, data: body });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/register", async (req: Request, res: Response) => {
  try {
    const data: User = req.body;

    const requiredFields: (keyof User)[] = [
      "name",
      "username",
      "email",
      "password",
      "confirmPassword",
      "isAdmin",
    ];
    for (const field of requiredFields) {
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
})


export default router;