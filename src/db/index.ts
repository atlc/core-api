import * as mysql from "mysql";
import { MySQL_Res } from "../utils/types";
import { sqlConfig } from "../config";

const pools = mysql.createPoolCluster();
Object.keys(sqlConfig).forEach(conf => pools.add(conf, sqlConfig[conf]));

export const Query = <T = MySQL_Res>(query: string, poolToUse: string, values?: unknown[]) => {
    return new Promise<T>((resolve, reject) => {
        const formattedSql = mysql.format(query, values);
        console.log({ SQL: `\n${formattedSql}\n` });

        pools.getConnection(poolToUse, (connErr, connection) => {
            if (connErr) return reject(connErr);

            console.log({ DB: `Cluster connected to ::${poolToUse}:: with thread ID ::${connection.threadId}::` });

            connection.query(formattedSql, (err, results) => {
                err ? reject(err) : resolve(results);
            });
        });
    });
};

export * as users from "./queries/users";
export * as notes from "./queries/notes";
export * as auth from "./queries/auth";
export * as bills from "./queries/billtracker";
