import { v4 as uuid } from "uuid";
import * as db from "../db";
import { send } from "./mailer";
import { URL_BASE } from "../config";

const TWO_HOUR_LIMIT = 7200000;

export const send_confirmation_email = async (
    userid: string,
    email: string,
    from: string = "registration@atlc.dev",
    subject: string = "Please Confirm Your Account",
    url_path: string = "verify",
    tags: string[] = [""]
) => {
    const registration_token = uuid();

    await db.auth.clear_all_for_user(userid);

    await db.auth.create_auth_token({
        id: registration_token,
        created_at: Date.now(),
        expires_at: Date.now() + TWO_HOUR_LIMIT,
        user_id: userid
    });

    send(email, from, subject, `${URL_BASE}/auth/${url_path}/?userid=${userid}&token=${registration_token}`, tags);
};
