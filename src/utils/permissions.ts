import * as passport from 'passport';
import { Router, NextFunction, RequestHandler, Response } from 'express';
import { ExtensibleHandler, RequestUser } from '../../lib/types';

const router = Router();

export const isRole: ExtensibleHandler | any = (req: RequestUser, res: Response, next: NextFunction, role_type: string) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (info) return res.status(401).json({ message: "There was an unknown error while authenticating, please try again.", error: info.message });
        if (!user) return res.status(401).json({ message: "There was an unknown error while authenticating, please try again." });

        if (!user.roles.includes(role_type)) {
            res.status(403).json({
                message: "You have insufficient permissions to access this resource.",
                current_roles: JSON.parse(user.roles),
                required_role: role_type
            });
            return;
        }

        req.user = user;
        return next();
    })(req, res, next, role_type);
}



export const isUser = (req: RequestUser, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (info) return res.status(401).json({ message: "There was an unknown error while authenticating, please try again.", error: info.message });
        if (!user) return res.status(401).json({ message: "There was an unknown error while authenticating, please try again." });

        if (user) req.user = user;

        console.log(req.user);
        return next();
    })(req, res, next);
}