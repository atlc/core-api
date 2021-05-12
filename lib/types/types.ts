import { Users } from './models';
import { NextFunction, Request, Response } from 'express';
import * as core from 'express-serve-static-core'

export interface TokenPayload {
    id?: Users['id'];
    roles?: Users['roles'];
}

export interface ExtensibleHandler<
    P = core.ParamsDictionary,
    ResBody = any,
    ReqBody = any,
    ReqQuery = core.Query,
    Locals extends Record<string, any> = Record<string, any>
    > extends core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {
    (req: RequestUser, res: Response, next: NextFunction, role_type?: string): void
}


export interface RequestUser extends Request {
    user?: TokenPayload;
}

export interface HTTPError {
    message: string;
    status: number;
}