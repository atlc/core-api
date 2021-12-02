import { Query } from "..";
import { Tokens, SMSCodes } from "../../utils/types";

export const create_auth_token = (new_token_info: { [key: string]: string | number }) =>
    Query("INSERT INTO Tokens SET ?", "auth", [new_token_info]);
export const get_auth_token = (id: string) => Query<Tokens[]>("SELECT * FROM Tokens WHERE id=?", "auth", [id]);
export const invalidate = (id: string) => Query("DELETE FROM Tokens WHERE id=?", "auth", [id]);
export const clear_all_for_user = (id: string) => Query("DELETE FROM Tokens WHERE user_id=?", "auth", [id]);

export const create_sms_code = (new_token_info: SMSCodes) => Query("INSERT INTO SMSCode SET ?", "auth", [new_token_info]);
export const get_sms_token = (id: string, user_id: string) =>
    Query<SMSCodes[]>("SELECT * FROM SMSCode WHERE id=? AND user_id=?", "auth", [id, user_id]);
export const clear_all_sms_for_user = (id: string) => Query("DELETE FROM SMSCode WHERE user_id=?", "auth", [id]);
