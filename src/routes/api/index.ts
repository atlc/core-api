import { Router } from "express";
import { RequestUser } from "../../../lib/types";
import { isUser } from "../../utils/permissions";
import notesRouter from "./notes";
import usersRouter from "./users";
import contactRouter from "./contact";

const router = Router();

router.get("/coffee", (req, res) => res.sendStatus(418));

router.get("/status", isUser, (req: RequestUser, res) => {
    res.status(200).json({ message: "API is responding, auth service is responding" });
});

router.use("/notes", notesRouter);
router.use("/users", usersRouter);
router.use("/contact", contactRouter);

export default router;
