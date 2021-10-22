import * as express from "express";
import { errorHandler } from "./global-error-handler";
import routes from "../routes";
import { HTTPError } from "../utils/types";

export const set_routes = (app: express.Application) => {
    app.use(routes);

    app.use("*", (req, res, next) => {
        const badPathError: HTTPError = new Error(`${req.originalUrl} is not a valid path`);
        badPathError.status = 404;
        next(badPathError);
    });

    app.use(errorHandler);
};
