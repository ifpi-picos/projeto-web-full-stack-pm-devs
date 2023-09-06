import { Router } from "express";
const router = Router();

import userRoute from "./routes/userRoute";

router.use("/users", userRoute);

export default router;