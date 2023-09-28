import { Router } from "express";
const router = Router();

import userRoute from "./routes/userRoute";
import authRoute from "./routes/authRoute";
import groupRoute from "./routes/groupRoute";
import muralRoute from "./routes/muralRoute";
import memberRoute from "./routes/memberRoute";


router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/groups", groupRoute);
router.use("/murals", muralRoute);
router.use("/members", memberRoute);

export default router;