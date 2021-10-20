import * as passport from "passport";
import * as PassportLocal from "passport-local";
import * as PassportJWT from "passport-jwt";

import * as db from "../db";
import { jwt as jwt_conf, URL_BASE } from "../config";
import { tokens, passwords } from "../utils/security";
import { checkIfValid } from "../utils/isEmail";
import { TokenPayload, Users } from "../../lib/types";
import { send } from "../services/mailer";
import { v4 as uuid } from "uuid";

passport.serializeUser((user: Users, done) => {
    user?.hashed && delete user.hashed;
    done(null, user);
});
passport.deserializeUser((user, done) => done(null, user));

passport.use(
    new PassportLocal.Strategy(
        {
            usernameField: "email",
            session: false
        },
        async (email, password, done) => {
            try {
                /* Validate if a user is logging in with either email or username */
                const isEmail = checkIfValid(email);

                const [user] = await db.users.search_by(isEmail ? "email" : "username", email);
                if (!user) throw new Error("Cannot log in - user with that username or email does not exist.");

                if (!user.verified) {
                    await db.auth.clear_all_for_user(user.id);

                    const registration_token = uuid();

                    const TWO_HOUR_LIMIT = 7200000;

                    await db.auth.create_auth_token({
                        id: registration_token,
                        created_at: Date.now(),
                        expires_at: Date.now() + TWO_HOUR_LIMIT,
                        user_id: user.id
                    });

                    send(
                        user.email,
                        "registration@atlc.dev",
                        "Please Confirm Your Account",
                        `
                        ${URL_BASE}/auth/verify?userid=${user.id}&token=${registration_token}
                    `
                    );

                    throw new Error("User has not verified account - please check email for new link to verify account.");
                }

                const passwordsMatch = await passwords.verify(password, user.hashed);

                if (user && passwordsMatch) {
                    delete user.hashed;
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    new PassportJWT.Strategy(
        {
            jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwt_conf.secret
        },
        (payload: TokenPayload, done) => {
            try {
                done(null, payload);
            } catch (error) {
                done(error);
            }
        }
    )
);
