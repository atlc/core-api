import * as express from "express";
import * as db from "../../db";
import { send_confirmation_email } from "../../services/registration_confirmation";
import { validate_token } from "../../services/token_validator";
import { checkIfValid } from "../../utils/isEmail";

const router = express.Router();

interface ReqWithQueryParams extends express.Request {
    query: {
        userid: string;
        token: string;
    };
}

router.post("/initiate", async (req: ReqWithQueryParams, res) => {
    try {
        const { email } = req.body;

        if (!email) return res.status(400).json({ message: "Please ensure email or username are provided" });

        const isEmail = checkIfValid(email);

        const [user] = await db.users.search_by(isEmail ? "email" : "username", email);

        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        send_confirmation_email(user.id, user.email, "password_reset@atlc.dev", "Password Reset Requested", "reset");

        res.status(200).json({ message: "Password request submitted, please check email." });
    } catch (these_hands) {
        res.status(500).json({ error: these_hands });
    }
});

router.post("/", async (req, res) => {
    try {
        const { token, userid, password } = req.body;

        if (!token || !userid)
            return res.status(400).json({ message: "An error happened, please navigate to this page through the link in your email." });

        if (!password) return res.status(400).json({ message: "Please fill out the password field." });

        const [user] = await db.users.single(userid);

        const checked_token = await validate_token(userid, token);

        if (!checked_token.is_valid) {
            if (checked_token.rejection_reason.toLowerCase().includes("expired")) {
                await db.auth.clear_all_for_user(userid);
                send_confirmation_email(user.id, user.email, "password_reset@atlc.dev", "Password Reset Requested", "reset");
            }
            return res.status(400).json({ message: checked_token.rejection_reason });
        }

        await db.users.update(userid, { ...user, password });
        await db.auth.clear_all_for_user(userid);

        res.status(200).json({ message: "You successfully updated your password!" });
    } catch (these_hands) {
        res.status(500).json({ error: these_hands });
    }
});

export default router;
