import * as dotenv from 'dotenv';
import { ConnectionPoolConfig } from '../../lib/types';

dotenv.config();

export const cors = {
    approvedDomains: process.env.CORS_APPROVED_DOMAINS,
    methods: process.env.CORS_APPROVED_METHODS
}

export const sqlConfig = {
    auth: {
        database: process.env.AUTH_DB_SCHEMA,
        host: process.env.AUTH_DB_HOST,
        user: process.env.AUTH_DB_USER,
        password: process.env.AUTH_DB_PASS
    },
    shopping: {
        database: process.env.SHOPPING_DB_SCHEMA,
        host: process.env.SHOPPING_DB_HOST,
        user: process.env.SHOPPING_DB_USER,
        password: process.env.SHOPPING_DB_PASS
    }
}

export const jwt = {
    secret: process.env.JWT_SIGNATURE,
    expiration: process.env.JWT_EXPIRY
}