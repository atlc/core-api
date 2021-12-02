import { Query } from "..";
import { BillTypes, Bills } from "../../utils/types";

const POOL = "bill_tracker";

export const get_types = () => Query<BillTypes[]>("SELECT * FROM BillTypes", POOL);

export const get_all = () =>
    Query<Bills[]>(
        "SELECT b.id, bt.name as utility_name, b.amount, b.payment_date FROM Bills b JOIN BillTypes bt ON b.type_id=bt.id",
        POOL
    );

export const find_by = (column: string, value: unknown) =>
    Query<Bills[]>(
        "SELECT b.id, bt.name as utility_name, b.amount, b.payment_date FROM Bills b JOIN BillTypes bt ON b.type_id=bt.id WHERE ??=?",
        POOL,
        [column, value]
    );

export const create_entry = (new_entry: Bills) => Query("INSERT INTO Bills SET ?", POOL, [new_entry]);
