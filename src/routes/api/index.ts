import { Router } from "express";
import { RequestUser } from "../../../lib/types";
import { isUser } from "../../utils/permissions";
import notesRouter from "./notes";
import usersRouter from "./users";
import contactRouter from "./contact";
import kindleRouter from "./kindle";

const router = Router();

router.get("/coffee", (req, res) => res.sendStatus(418));

router.get("/status", isUser, (req: RequestUser, res) => {
    res.status(200).json({ message: "API is responding, auth service is responding" });
});

router.use("/notes", isUser, notesRouter);
router.use("/users", usersRouter);
router.use("/contact", contactRouter);
router.use("/kindle", kindleRouter);

export default router;
