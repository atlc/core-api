import { Router } from 'express';
import { isAdmin, isUser } from '../../utils/permissions';
import { users } from '../../db';

const router = Router();

router.get('/', async (req, res) => {
    console.log(req.user)
    const test = await users.all();
    res.send(test)
});

router.get('/status', isAdmin, (req, res) => {
    res.status(269).send('API is responding, auth service is responding');
});

export default router;
