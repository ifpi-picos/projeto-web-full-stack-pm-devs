import { Router } from "express";
const router = Router();

import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import groupRoute from "./routes/groupRoute";
import muralRoute from "./routes/muralRoute";

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/groups", groupRoute);
router.use("/murals", muralRoute);

export default router;