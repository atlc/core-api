import * as express from "express";
import * as db from "../../db";
import { send_confirmation_email } from "../../services/registration_confirmation";

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

        const [db_token] = await db.auth.get_auth_token(token);
        const [user] = await db.users.single(userid);

        console.log({ token, userid, db_token });

        if (!db_token) {
            res.status(400).json({ message: "Token expired or doesn't exist" });
            return;
        }

        if (userid !== db_token.user_id || !user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        if (Date.now() > db_token.expires_at) {
            send_confirmation_email(userid, user.email);
            res.status(400).json({ message: "That token has expired, please ABSTRACT REGISTER TOKEN TO FUNCTION AND USE HERE TOO" });
            return;
        }

        await db.users.update(userid, { ...user, verified: 1 });
        await db.auth.clear_all_for_user(userid);

        res.status(200).json({ message: "You successfully verified your user account!" });
    } catch (these_hands) {
        res.status(500).json({ error: these_hands });
    }
});

export default router;
