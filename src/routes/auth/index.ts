import { Router } from "express";

import loginRouter from "./login";
import registerRouter from "./register";
import verifyRouter from "./verify";

const router = Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/verify", verifyRouter);

export default router;
