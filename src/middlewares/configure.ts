import * as express from 'express';
import * as passport from 'passport';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as helmet from 'helmet';

import './passport-strategies';

export const configure = (app: express.Application) => {
    app.use(passport.initialize());
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(compression());
}