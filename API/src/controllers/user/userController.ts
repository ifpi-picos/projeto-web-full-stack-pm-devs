import { Request, Response } from "express";
import { userService } from "../../services/user/userServices";
import { userRepository } from "../../repositories/user/userRepository";
import { User } from "../../models/User";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const repository = await new userRepository();
    const users = await new userService(repository).getAllUsers();

    if (!users || users.length === 0) return res.status(404).json("No registered user.");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const getUserById = async (req: Request, res: Response)  => {
  try {
    const { id } = req.params;
    const repository = await new userRepository();
    const user = await new userService(repository).getUserById(id);

    if (!user) return res.status(404).json("User not found.");

    const { password, ...userRest } = user;
    password

    res.status(200).json(userRest);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

const addUser = async(req: Request, res: Response) => {
  try {
    const user: User = req.body;

    const requiredFields:(keyof User)[] = ["name", "username", "email", "password", "confirmPassword", ]
    for (const field of requiredFields) {
      if(!user[field] || user[field]?.toString().trim() === "") {
        return res.status(400).json(`The field ${field} is required.`)
      }
    }

    if (user.password !== user.confirmPassword) return res.status(400).json("Passwords do not match.")
    if (user.password.length < 8) return res.status(400).json("The password needs at least eight characters.")

    const repository = await new userRepository();
    const newUser = await new userService(repository).addUser(user);

    if(!newUser) return res.status(400).json("User not created.")

    res.status(200).json("User created.");
  } catch (error) {
    res.status(500).json({ error: error });
  }
}

export default {
  getAllUsers,
  getUserById,
  addUser
}