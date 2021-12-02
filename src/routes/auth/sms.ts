import { Router } from "express";
import { clear_all_sms_for_user, get_sms_token, create_sms_code } from "../../db/queries/auth";
import { single, update } from "../../db/queries/users";
import { tokens } from "../../utils/security";
import { send_sms } from "../../services/twilio";

const router = Router();

const FIFTEEN_MINUTES = 900000;

// Initiate confirmation process for enabling 2fa
router.post("/confirm/initiate", async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const [user] = await single(user_id);
        await update(user_id, { ...user, sms_enabled: 1 });

        const code = Math.floor(Math.random() * 100000).toString();

        await create_sms_code({
            user_id,
            created_at: Date.now(),
            expires_at: Date.now() + FIFTEEN_MINUTES,
            id: code
        });

        send_sms(user.phone_number, `Enter this as your code (expires in 15 minutes): ${code}`);

        res.status(201).json({ message: "Confirmation text sent. Please check your inbox and enter it within 15 minutes." });
    } catch (error) {
        next(error);
    }
});

// Actually confirming user's ownership of phone number
router.post("/confirm", async (req, res, next) => {
    try {
        const { user_id, code } = req.body;

        const [user] = await single(user_id);
        const [token] = await get_sms_token(code, user_id);

        if (!user || !token) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (Date.now() > token.expires_at) {
            const code = Math.floor(Math.random() * 100000).toString();

            await clear_all_sms_for_user(user_id);

            await create_sms_code({
                user_id,
                created_at: Date.now(),
                expires_at: Date.now() + FIFTEEN_MINUTES,
                id: code
            });

            send_sms(user.phone_number, `Enter this as your code (expires in 15 minutes): ${code}`);

            return res
                .status(401)
                .json({ message: "Code expired and a new one was sent. Please check your inbox and enter it within 15 minutes." });
        }

        await update(user_id, { ...user, sms_verified: 1 });
        await clear_all_sms_for_user(user_id);

        res.status(200).json({ message: "The phone number has successfully been confirmed!" });
    } catch (error) {
        next(error);
    }
});

router.post("/verify", async (req, res, next) => {
    const { code, user_id } = req.body;

    try {
        const [stored] = await get_sms_token(code, user_id);
        const [user] = await single(user_id);

        if (!stored || !user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!user.sms_verified) {
            const code = Math.floor(Math.random() * 100000).toString();

            await clear_all_sms_for_user(stored.user_id);
            await create_sms_code({
                user_id,
                created_at: Date.now(),
                expires_at: Date.now() + FIFTEEN_MINUTES,
                id: code
            });

            send_sms(user.phone_number, `Enter this as your code (expires in 15 minutes): ${code}`);
            return res.status(400).json({ message: "Invalid credentials, phone number must be verified before logging in" });
        }

        if (stored.expires_at > Date.now()) {
            await clear_all_sms_for_user(stored.user_id);

            const token = await tokens.create({ id: user.id, roles: user.roles, isVerified: user.verified });
            res.json({ message: "Congrats!", token });
        } else {
            const code = Math.floor(Math.random() * 100000).toString();

            await clear_all_sms_for_user(user_id);

            await create_sms_code({
                user_id,
                created_at: Date.now(),
                expires_at: Date.now() + FIFTEEN_MINUTES,
                id: code
            });

            send_sms(user.phone_number, `Enter this as your code (expires in 15 minutes): ${code}`);

            return res
                .status(401)
                .json({ message: "Code expired and a new one was sent. Please check your inbox and enter it within 15 minutes." });
        }
    } catch (error) {
        next(error);
    }
});

export default router;
