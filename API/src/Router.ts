import { Router } from "express";
const router = Router();

import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import groupRoute from "./routes/groupRoute";

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/group", groupRoute);

export default router;