import { Router } from "express";
import { v4 as uuid } from "uuid";
import { checkIfValid } from "../../utils/isEmail";
import * as db from "../../db";
import { send_confirmation_email } from "../../services/registration_confirmation";
import { ReqWithQueryParams, TokenPayload } from "../../utils/types";
import { validate_token } from "../../services/token_validator";
import { tokens } from "../../utils/security";

const router = Router();

router.post("/initiate", async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Please ensure email or username are provided" });

        const isValid = checkIfValid(email);
        const [user] = await db.users.search_by(isValid ? "email" : "username", email);

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        send_confirmation_email(user.id, user.email, "magic_link@atlc.dev", "Magic Link Login", "magic_link");

        res.status(200).json({ message: "Check your email for your magic link" });
    } catch (error) {
        next(error);
    }
});

router.get("/", async (req: ReqWithQueryParams, res, next) => {
    try {
        const { userid, token } = req.query;

        const [user] = await db.users.single(userid);

        const checked_token = await validate_token(userid, token);

        if (!checked_token.is_valid) {
            if (checked_token.rejection_reason.toLowerCase().includes("expired")) {
                await db.auth.clear_all_for_user(userid);
                send_confirmation_email(user.id, user.email, "magic_link@atlc.dev", "Magic Link Login", "magic_link");
            }
            return res.status(400).json({ message: checked_token.rejection_reason });
        }

        const magic_token = await tokens.create({ id: user.id, roles: user.roles, isVerified: user.verified });

        res.status(200).json({ message: "You're now logged in with the magic link!", token: magic_token });
    } catch (error) {
        next(error);
    }
});

export default router;
