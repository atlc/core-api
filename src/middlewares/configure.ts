import * as express from 'express';
import * as passport from 'passport';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';

import * as config from '../config';
import './passport-strategies';


export const configure = (app: express.Application) => {
  app.use(passport.initialize());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(compression());



  app.use(cors({
    origin: (origin, callback) => {
      config.cors.approvedDomains.includes(origin) ? callback(null, true) : new Error('Origin not approved by CORS')
    },
    methods: config.cors.methods,
    preflightContinue: false,
    optionsSuccessStatus: 204
  }));
}