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
    res.status(200).json({
        message: "API is responding, auth service is responding",
        current_user_info: { id: req.user, roles: req.user.roles }
    });
});

router.use("/notes", notesRouter);
router.use("/users", usersRouter);
router.use("/contact", isAdmin, contactRouter);
router.use("/kindle", isAdmin, kindleRouter);
router.use("/bills", billRouter);

export default router;
