import { Router } from "express";
const router = Router();

import userRoute from "./routes/userRoute";

router.use("/user", userRoute);

export default router;