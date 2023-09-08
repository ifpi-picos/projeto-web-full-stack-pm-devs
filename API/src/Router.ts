import { Router } from "express";
const router = Router();

import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";
import authRoute from "./routes/authRoute";

router.use("/users", userRoute);
router.use("/admins", adminRoute);
router.use("/auth", authRoute);

export default router;