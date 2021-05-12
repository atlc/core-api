import { Router } from 'express';
import { v4 as uuid } from 'uuid'
import { validate } from '@atlc/hibp';
import { Users } from '../../../lib/types';
import { passwords as pw, tokens } from '../../utils/security';
import * as db from '../../db';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const newUser: Users = req.body;

        const { username, email, password } = newUser;

        if (username && email && password) {
            const { isPwned, breaches } = await validate(password);

            if (isPwned) {
                throw new Error(`You cannot register with that password. It has been found in ${breaches} public breaches per HaveIBeenPwned.com`);
            }

            newUser.id = uuid();
            newUser.hashed = await pw.slinging_slasher(password);

            delete newUser.password;

            const add = await db.users.create(newUser);

            if (add.errno) {
                throw new Error(add.sqlMessage);
            } else {
                const token = await tokens.create({ id: newUser.id, roles: JSON.stringify(["user"]) })
                res.status(201).json({
                    message: "The user was successfully created!",
                    id: newUser.id,
                    token
                });
            }
        } else {
            throw new Error('Username, Email, and Password fields must all be completed for registration.');
        }
    } catch (error) {
        next(error);
    }
});

export default router;