import * as express from "express";
import * as db from "../../db";
import { send_confirmation_email } from "../../services/registration_confirmation";
import { validate_token } from "../../services/token_validator";

const router = express.Router();

interface ReqWithQueryParams extends express.Request {
    query: {
        userid: string;
        token: string;
    };
}

router.get("/", async (req: ReqWithQueryParams, res) => {
    try {
        const { token, userid } = req.query;

        const [user] = await db.users.single(userid);

        const checked_token = await validate_token(userid, token);

        if (!checked_token.is_valid) {
            if (checked_token.rejection_reason.toLowerCase().includes("expired")) {
                await db.auth.clear_all_for_user(userid);
                send_confirmation_email(user.id, user.email);
            }
            return res.status(400).json({ message: checked_token.rejection_reason });
        }

        await db.users.update(userid, { ...user, verified: 1 });
        await db.auth.clear_all_for_user(userid);

        res.status(200).json({ message: "You successfully verified your user account!" });
    } catch (these_hands) {
        res.status(500).json({ error: these_hands });
    }
});

export default router;
