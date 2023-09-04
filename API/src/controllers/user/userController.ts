import { Request, Response } from "express";
import { userService } from "../../services/user/userServices";
import { userRepository } from "../../repositories/user/userRepository";

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

export default {
  getAllUsers
}