import { Router } from "express";
import { RequestUser } from "../../utils/types";
import { isAdmin, isFromApprovedDomain, isUser } from "../../middlewares/permissions";
import notesRouter from "./notes";
import usersRouter from "./users";
import contactRouter from "./contact";
import kindleRouter from "./kindle";
import billRouter from "./bills";
import rhythm_and_bluesRouter from "./rhythm_and_blues";

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
router.use("/contact", contactRouter);
router.use("/kindle", isAdmin, kindleRouter);
router.use("/bills", isFromApprovedDomain, billRouter);
router.use(["/rhythm_and_blues", "/hiphop", "/hip_hop", "/r&b"], rhythm_and_bluesRouter);

export default router;
