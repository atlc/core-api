import * as mysql from 'mysql';
import { mysql as mysqlConf } from '../config';
import { MySQL_Res } from '../../lib/types';

const pool = mysql.createPool(mysqlConf);

export const Query = <T = MySQL_Res>(query: string, values?: any[]) => {
    return new Promise<T>((resolve, reject) => {
        const formattedSql = mysql.format(query, values);
        console.log({ formattedSql });

        pool.query(formattedSql, (err, results) => {
            err ? reject(err) : resolve(results)
        });
    });
}

export * as users from './queries/users';