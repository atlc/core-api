import { Note } from '../../../lib/types';
import { Query } from '../index';

export const get_notes_by_user = (user_id: string) => Query<Note[]>('SELECT * FROM Notes WHERE user_id=?', 'notes', [user_id]);
export const get_note = (id: string, user_id: string) => Query<Note[]>('SELECT * FROM Notes WHERE id=? AND user_id=?', 'notes', [id, user_id]);

export const create_note = (new_note: Note) => Query('INSERT INTO Notes SET ?', 'notes', [new_note]);
export const update_note = ({ content, id, user_id }: Note) => Query('UPDATE Notes SET content=? WHERE id=? AND user_id=?', 'notes', [content, id, user_id]);
export const destroy_note = (id: string, user_id: string) => Query('DELETE FROM Notes WHERE id=? AND user_id=?', 'notes', [id, user_id]);
