import { Router } from 'express';
import { isAdmin, isUser } from '../../utils/permissions';

const router = Router();

router.get('/', (req, res) => {
    console.log(req.user)
    res.send('api lol')
});


router.get('/status',isAdmin, (req, res) => {
    res.status(269).send('API is responding, auth service is responding');
});

export default router;
