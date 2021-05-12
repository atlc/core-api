import * as express from 'express';
import { errorHandler } from './global-error-handler';
import routes from '../routes';

export const set_routes = (app: express.Application) => {
    app.use(routes);
    app.use(errorHandler);
}