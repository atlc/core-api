import * as passport from 'passport';
import { NextFunction, Response } from 'express';
import { RequestUser } from '../../lib/types';


export const isUser = (req: RequestUser, res: Response, next: NextFunction) => {
    checkToken(req, res, next);
}

export const isAdmin = (req: RequestUser, res: Response, next: NextFunction) => {
    checkToken(req, res, next, 'admin');
}

export const isSuperadmin = (req: RequestUser, res: Response, next: NextFunction) => {
    checkToken(req, res, next, 'superadmin');
}

const checkToken = (req: RequestUser, res: Response, next: NextFunction, role: string = 'user') => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (info) return res.status(401).json({ message: "There was an error while authenticating, please make sure you try logging in again before retrying.", error: info.message });
        if (!user) return res.status(503).json({ message: "There was an unknown error while authenticating user session, please try again later." });

        if (user) req.user = user;

        if (!user.roles.includes(role)) {
            return res.status(403).json({
                message: "You have insufficient permissions to access this resource.",
                current_roles: JSON.parse(user.roles),
                required_role: role
            });
        }

        next();
    })(req, res, next);
}