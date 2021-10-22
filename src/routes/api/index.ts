import { Router } from "express";
import { RequestUser } from "../../utils/types";
import { isAdmin, isUser } from "../../utils/permissions";
import notesRouter from "./notes";
import usersRouter from "./users";
import contactRouter from "./contact";
import kindleRouter from "./kindle";
import billRouter from "./bills";

const router = Router();

router.get("/coffee", (req, res) => res.sendStatus(418));

router.get("/status", (req: RequestUser, res) => {
    res.status(200).json({ message: "API is responding" });
});

router.get("/status/auth", isUser, (req: RequestUser, res) => {
    res.status(200).json({ message: "API is responding, auth service is responding" });
});

router.use("/notes", notesRouter);
router.use("/users", usersRouter);
router.use("/contact", contactRouter);
router.use("/kindle", kindleRouter);

router.use("/bills", isAdmin, billRouter);

export default router;
