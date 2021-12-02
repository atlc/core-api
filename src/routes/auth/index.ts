import { Router } from "express";

import loginRouter from "./login";
import registerRouter from "./register";
import verifyRouter from "./verify";
import resetRouter from "./reset";
import magic_linkRouter from "./magic_link";
import smsRouter from "./sms";

const router = Router();

router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/verify", verifyRouter);
router.use("/reset", resetRouter);
router.use("/magic_link", magic_linkRouter);
router.use("/sms", smsRouter);

export default router;
