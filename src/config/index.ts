import * as dotenv from 'dotenv';

dotenv.config();

export const mysql = {
    database: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

export const jwt = {
    secret: process.env.JWT_SIGNATURE,
    expiration: process.env.JWT_EXPIRY
}