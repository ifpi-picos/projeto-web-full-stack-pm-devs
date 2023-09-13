import { Router } from "express";
const router = Router();

import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";

router.use("/users", userRoute);
router.use("/auth", authRoute);

export default router;