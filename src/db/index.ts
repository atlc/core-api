import * as mysql from 'mysql';
import { MySQL_Res } from '../../lib/types';
import { sqlConfig } from '../config'

const pools = mysql.createPoolCluster();
// @ts-ignore
Object.keys(sqlConfig).forEach(conf => pools.add(`${conf}`, sqlConfig[`${conf}`]));

export const Query = <T = MySQL_Res>(query: string, poolToUse: string, values?: any[]) => {
    return new Promise<T>((resolve, reject) => {
        const formattedSql = mysql.format(query, values);
        console.log({ SQL: `\n${formattedSql}\n` });

        pools.getConnection(poolToUse, (connErr, connection) => {
            if (connErr) return reject(connErr);

            connection.query(formattedSql, (err, results) => {
                err ? reject(err) : resolve(results)
            });
        });
    });
}

export * as users from './queries/users';
export * as notes from './queries/notes';