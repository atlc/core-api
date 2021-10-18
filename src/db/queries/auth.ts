import { Query } from "..";

export const create_auth_token = new_token_info => Query("INSERT INTO Tokens SET ?", "auth", [new_token_info]);
export const get_auth_token = (id: string) => Query("SELECT * FROM Tokens WHERE id=?", "auth", [id]);
export const invalidate = (id: string) => Query("UPDATE Tokens SET is_used=1 WHERE id=?", "auth", [id]);
