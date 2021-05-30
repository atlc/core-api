import { Request, Response, NextFunction, } from 'express';
import { HTTPError } from '../../lib/types';

export const errorHandler = (err: HTTPError, req: Request, res: Response, next: NextFunction) => {
    console.log(`\n\n${err.message}\n\n`)

    res.status(err.status || 500).json({ message: "An error occurred!", error: err.message });
};