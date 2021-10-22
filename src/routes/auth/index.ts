import { Router } from "express";

import loginRouter from "./login";
import registerRouter from "./register";
import verifyRouter from "./verify";
import resetRouter from "./reset";
import magic_linkRouter from "./magic_link";

const router = Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/verify", verifyRouter);
router.use("/reset", resetRouter);
router.use("/magic_link", magic_linkRouter);

export default router;
