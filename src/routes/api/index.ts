import { Router } from 'express';
import { isRole, isUser } from '../../utils/permissions';

const router = Router();

router.get('/', (req, res) => {
    console.log(req.user)
    res.send('api lol')
});


router.get('/status', (q,s,n) => isRole(q,s,n, 'admin'), (req, res) => {
    res.status(269).send('API is responding, auth service is responding');
});

export default router;
