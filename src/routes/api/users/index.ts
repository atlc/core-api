import e, { Router } from 'express';
import { RequestUser, Users } from '../../../../lib/types';
import { isUser } from '../../../utils/permissions';
import { users } from '../../../db'

const router = Router();

router.get('/profile/:id', isUser, async (req: RequestUser, res, next) => {
    try {
        const user_id_params = req.params.id;
        const user_id_token = req.user.id;

        if (user_id_params === user_id_token) {
            const [user] = await users.single(user_id_token);
            delete user.hashed;
            delete user.visible;
            res.json(user)
        } else {
            throw new Error(`You are not permitted to view others' profiles.`)
        }
    } catch (error) {
        next(error);
    }
});

export default router;