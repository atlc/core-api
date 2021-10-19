import { Router } from "express";
import { v4 as uuid } from "uuid";
import { validate } from "@atlc/hibp";
import { Users } from "../../../lib/types";
import { passwords as pw, tokens } from "../../utils/security";
import { checkIfValid } from "../../utils/isEmail";
import { send } from "../../services/mailer";

import * as db from "../../db";

const TWO_HOUR_LIMIT = 7200000;

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const newUser: Users = req.body;

        const { username, email, password } = newUser;

        if (username && email && password) {
            if (username.length > 24 || email.length > 64 || password.length > 72) {
                throw new Error("Registration fields must not be longer than the count specified below.");
            }

            const { isPwned, breaches } = await validate(password);
            if (isPwned) {
                throw new Error(
                    `You cannot register with that password. It has been found in ${breaches.toLocaleString()} public breaches per HaveIBeenPwned.com`
                );
            }

            if (!checkIfValid(email)) throw new Error("Must be a valid email address.");

            newUser.id = uuid();
            newUser.hashed = await pw.slinging_slasher(password);

            delete newUser.password;

            const add = await db.users.create(newUser);

            if (add.errno) {
                throw new Error(add.sqlMessage);
            } else {
                const registration_token = uuid();
                await db.auth.create_auth_token({
                    id: registration_token,
                    created_at: Date.now(),
                    expires_at: Date.now() + TWO_HOUR_LIMIT,
                    user_id: newUser.id
                });

                const URL_BASE = req.protocol + "://" + req.get("host");

                send(
                    email,
                    "<MyBackendLol>registration@test.io",
                    "Please Click Link plz plz plzzzzz",
                    `
                    ${URL_BASE}/verify?userid=${newUser.id}&token=${registration_token}
                `
                );

                res.status(201).json({
                    message: "The user was successfully created! Please check your email to verify the user",
                    id: newUser.id
                });
            }
        } else {
            throw new Error("Username, Email, and Password fields must all be completed for registration.");
        }
    } catch (error) {
        next(error);
    }
});

export default router;
