import * as db from "../db";

export const validate_token = async (userid: string, token: string) => {
    const [db_token] = await db.auth.get_auth_token(token);
    const [user] = await db.users.single(userid);

    const results = { is_valid: false, rejection_reason: "" };

    if (!db_token) {
        results.rejection_reason = "Token expired or doesn't exist";
        return results;
    }

    if (userid !== db_token.user_id || !user) {
        results.rejection_reason = "Invalid credentials";
        return results;
    }

    if (Date.now() > db_token.expires_at) {
        results.rejection_reason = "That token has expired, please check your email for a new link.";
        return results;
    }

    results.is_valid = true;
    return results;
};
