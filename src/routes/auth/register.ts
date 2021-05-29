import { Router } from 'express';
import { v4 as uuid } from 'uuid'
import { validate } from '@atlc/hibp';
import { Users } from '../../../lib/types';
import { passwords as pw, tokens } from '../../utils/security';
import { checkIfValid } from '../../utils/isEmail';

import * as db from '../../db';

const router = Router();

router.post('/', async (req, res, next) => {
    try {
        const newUser: Users = req.body;

        const { username, email, password } = newUser;

        if (username && email && password) {
            if (username.length > 24 || email.length > 64 || password.length > 72) throw new Error('Registration fields must not be longer than the count specified below.');

            const { isPwned, breaches } = await validate(password);
            if (isPwned) {
                throw new Error(`You cannot register with that password. It has been found in ${breaches.toLocaleString()} public breaches per HaveIBeenPwned.com`);
            }

            if (!checkIfValid(email)) throw new Error('Registration fields must not be longer than the count specified below.');

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