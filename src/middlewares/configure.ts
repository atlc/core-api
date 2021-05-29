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

  const corsOptionsDelegation = (req: any, callback: any) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const corsOptions = {
      methods: config.cors.methods,
      preflightContinue: false,
      optionsSuccessStatus: 204,
      origin: (config.cors.approvedDomains.includes(req.header('Origin') || ip))
    }
    callback(null, corsOptions);
  }

  app.use(cors(corsOptionsDelegation));
}