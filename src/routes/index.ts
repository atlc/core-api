import { Router } from "express";
import authRouter from "./auth";
import apiRouter from "./api";

const router = Router();

router.use("/v1", apiRouter);
router.use("/auth", authRouter);

router.get("/", (req, res) => {
    const other_links: { site: string; url: string }[] = [
        { site: "main portfolio site", url: "https://atlc.dev" },
        { site: "covid dashboard lite", url: "https://covid.atlc.dev" }
    ];
    res.json({ message: "There's nothing on the root of this API but I do have some other sites if you're interested!", other_links });
});

export default router;
