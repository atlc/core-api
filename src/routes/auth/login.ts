import { Router } from 'express';
import { authenticate } from 'passport';
import { RequestUser } from '../../../lib/types';
import { tokens } from '../../utils/security';

const router = Router();

router.post('/', authenticate('local'), async (req: RequestUser, res, next) => {
    try {
        console.log({ location: 'login router', body: req.body, user: req.user })

        const token = await tokens.create({ id: req.user.id, roles: req.user.roles });
        return res.json({ message: 'logged in!', token });
    } catch (error) {
        next(error);
    }
});

export default router;