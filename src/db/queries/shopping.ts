import { Query } from '../index';
import { Users } from '../../../lib/types'

export const all = () => Query<Users[]>('SELECT * FROM Users');
export const single = (id: Users['id']) => Query<Users[]>('SELECT * FROM Users WHERE id=?', null, [id]);
export const search_by = (column: string, value: string) => Query<Users[]>('SELECT * FROM Users WHERE ??=?', null, [column, value]);

export const create = (user: Users) => Query('INSERT INTO Users SET ?', null, [user]);
export const update = (id: Users['id'], user: Users) => Query('UPDATE Users SET ? WHERE id=?', null, [user, id]);
export const destroy = (id: Users['id']) => Query('DELETE FROM Users WHERE id=?', null, [id]);