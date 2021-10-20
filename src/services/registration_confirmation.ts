import { v4 as uuid } from "uuid";
import * as db from "../db";
import { send } from "./mailer";
import { URL_BASE } from "../config";

const TWO_HOUR_LIMIT = 7200000;

export const send_confirmation_email = async (userid: string, email: string) => {
    const registration_token = uuid();

    await db.auth.clear_all_for_user(userid);

    await db.auth.create_auth_token({
        id: registration_token,
        created_at: Date.now(),
        expires_at: Date.now() + TWO_HOUR_LIMIT,
        user_id: userid
    });

    send(
        email,
        "registration@atlc.dev",
        "Please Confirm Your Account",
        `${URL_BASE}/auth/verify?userid=${userid}&token=${registration_token}`
    );
};
