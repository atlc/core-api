import { Query } from "..";

export const create_auth_token = (new_token_info: { [key: string]: string | number }) =>
    Query("INSERT INTO Tokens SET ?", "auth", [new_token_info]);
export const get_auth_token = (id: string) => Query<any>("SELECT * FROM Tokens WHERE id=?", "auth", [id]);
export const invalidate = (id: string) => Query("DELETE FROM Tokens WHERE id=?", "auth", [id]);
export const clear_all_for_user = (id: string) => Query("DELETE FROM Tokens WHERE user_id=?", "auth", [id]);
