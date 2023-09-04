import { Router } from "express";
import userController from "../controllers/user/userController";

const router = Router();

router.get("/", userController.getAllUsers);

export default router