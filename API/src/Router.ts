import { Router } from "express";
const router = Router();

import userRoute from "./routes/userRoute";
import adminRoute from "./routes/adminRoute";

router.use("/users", userRoute);
router.use("/admins", adminRoute);

export default router;