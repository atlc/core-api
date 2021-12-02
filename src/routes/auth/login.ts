import { Router } from "express";
import { authenticate } from "passport";
import { RequestUser } from "../../utils/types";
import { tokens } from "../../utils/security";
import { create_sms_code, clear_all_sms_for_user } from "../../db/queries/auth";
import { send_sms } from "../../services/twilio";

const router = Router();

const FIFTEEN_MINUTES = 900000;

router.post("/", authenticate("local"), async (req: RequestUser, res, next) => {
    try {
        if (!req.user.sms_enabled) {
            const token = await tokens.create({ id: req.user.id, roles: req.user.roles });
            return res.json({ message: "logged in!", token, id: req.user.id });
        }

        const code = Math.floor(Math.random() * 100000).toString();

        await clear_all_sms_for_user(req.user.id);

        await create_sms_code({
            user_id: req.user.id,
            created_at: Date.now(),
            expires_at: Date.now() + FIFTEEN_MINUTES,
            id: code
        });

        send_sms(req.user.phone_number, `Enter this as your code (expires in 15 minutes): ${code}`);

        return res.status(201).json({ message: "Confirmation text sent. Please check your inbox and enter it within 15 minutes." });
    } catch (error) {
        next(error);
    }
});

export default router;
