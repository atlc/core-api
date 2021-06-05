import * as express from 'express';
import * as passport from 'passport';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';
import './passport-strategies';
import * as config from '../config';

//@ts-ignore
const corsOptionsDelegate =  function (req, cb) {
  const corsOptions = {
    origin: false
  }

  if (config.cors.approvedDomains.indexOf(req.header('Origin')) !== -1) {
    corsOptions['origin'] = true;
  }

  cb(null, corsOptions);
}


export const configure = (app: express.Application) => {
  app.use(passport.initialize());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(compression());
  app.use(cors(corsOptionsDelegate));
}