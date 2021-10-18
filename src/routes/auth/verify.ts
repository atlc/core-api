import * as express from "express";

import * as db from "../../db";

const router = express.Router();

router.put("/verify", async (req, res) => {
    try {
        const { userid, token } = req.query;
        const db_token = await db.auth.get_auth_token(token);

        if (!db_token) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        if (Date.now() > db_token.expires_at) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        if (db_token.is_used) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        if (userid !== db_token.user_id) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const user = await db.users.single(userid);
        await db.users.update(userid, { ...user, verified: 1 });
        await db.auth.invalidate(token);

        res.status(200).json({ message: "You successfully verified your user account!" });
    } catch (these_hands) {
        res.status(500).json({ error: these_hands });
    }
});
