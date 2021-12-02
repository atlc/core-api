import { Query } from "../index";
import { Users } from "../../utils/types";

export const all = () => Query<Users[]>("SELECT * FROM Users", "auth");
export const single = (id: Users["id"]) => Query<Users[]>("SELECT * FROM Users WHERE id=?", "auth", [id]);
export const search_by = (column: string, value: string) => Query<Users[]>("SELECT * FROM Users WHERE ??=?", "auth", [column, value]);

export const create = (user: Users) => Query("INSERT INTO Users SET ?", "auth", [user]);
export const update = (id: Users["id"], user: Users) => Query("UPDATE Users SET ? WHERE id=?", "auth", [user, id]);
export const destroy = (id: Users["id"]) => Query("DELETE FROM Users WHERE id=?", "auth", [id]);
