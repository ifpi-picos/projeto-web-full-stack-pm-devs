import { Request, Response } from "express";
import { Router } from "express";

// Models
import { Admin } from "../models/Admin";

// Services and Repositories
import { AdminRepository } from "../repositories/adminRepository";
import { AdminService } from "../services/adminService";
import { GroupRepository } from "../repositories/groupRepository";

const router = Router();

const repositoryAdmin = new AdminRepository();
const repositoryGroup = new GroupRepository();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { statusCode, body } = await new AdminService(
      repositoryAdmin,
      repositoryGroup
    ).getAllAdmins();

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { statusCode, body } = await new AdminService(repositoryAdmin, repositoryGroup).getAdminById(
      id
    );

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const admin: Admin = req.body;

    const requiredFields: (keyof Admin)[] = [
      "name",
      "email",
      "password",
      "confirmPassword",
      "phoneNumber"
    ];
    for (const field of requiredFields) {
      if (!admin[field] || admin[field]?.toString().trim() === "") {
        return res.status(400).json(`The field ${field} is required.`);
      }
    }

    if (admin.password !== admin.confirmPassword)
      return res.status(400).json("Passwords do not match.");
    if (admin.password.length < 8)
      return res
        .status(400)
        .json("The password needs at least eight characters.");

    const { statusCode, body } = await new AdminService(repositoryAdmin, repositoryGroup).addAdmin(admin);

    res.status(statusCode).json(body);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

export default router;
