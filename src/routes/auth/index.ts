import { Router } from "express";

import loginRouter from "./login";
import registerRouter from "./register";
import verifyRouter from "./verify";
import resetRouter from "./reset";

const router = Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/verify", verifyRouter);
router.use("/reset", resetRouter);

export default router;
