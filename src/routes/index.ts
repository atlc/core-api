import { Router } from "express";
import authRouter from "./auth";
import apiRouter from "./api";

const router = Router();

router.use("/v1", apiRouter);
router.use("/auth", authRouter);

export default router;
