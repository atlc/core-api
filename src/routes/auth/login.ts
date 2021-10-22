import { Router } from "express";
import { authenticate } from "passport";
import { RequestUser } from "../../utils/types";
import { tokens } from "../../utils/security";

const router = Router();

router.post("/", authenticate("local"), async (req: RequestUser, res, next) => {
    try {
        const token = await tokens.create({ id: req.user.id, roles: req.user.roles });
        return res.json({ message: "logged in!", token, id: req.user.id });
    } catch (error) {
        next(error);
    }
});

export default router;
