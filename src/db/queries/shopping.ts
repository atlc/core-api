import { Query } from '../index';
import { Users } from '../../../lib/types';

export const all = () => Query<Users[]>('SELECT * FROM Users', 'shopping');
export const single = (id: Users['id']) => Query<Users[]>('SELECT * FROM Users WHERE id=?', 'shopping', [id]);
export const search_by = (column: string, value: string) => Query<Users[]>('SELECT * FROM Users WHERE ??=?', 'shopping', [column, value]);

export const create = (user: Users) => Query('INSERT INTO Users SET ?', 'shopping', [user]);
export const update = (id: Users['id'], user: Users) => Query('UPDATE Users SET ? WHERE id=?', 'shopping', [user, id]);
export const destroy = (id: Users['id']) => Query('DELETE FROM Users WHERE id=?', 'shopping', [id]);