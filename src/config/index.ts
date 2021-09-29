import * as dotenv from "dotenv";
import { DBClusterConfig } from "../../lib/types";

dotenv.config();

export const cors = {
    approvedDomains: process.env.CORS_APPROVED_DOMAINS,
    methods: process.env.CORS_APPROVED_METHODS
};

export const mailgunConfig = {
    // username: process.env.MAILGUN_USERNAME,
    username: "api",
    key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
};

export const sqlConfig: DBClusterConfig = {
    auth: {
        database: process.env.AUTH_DB_SCHEMA,
        host: process.env.AUTH_DB_HOST,
        user: process.env.AUTH_DB_USER,
        password: process.env.AUTH_DB_PASS
    },
    notes: {
        database: process.env.NOTES_DB_SCHEMA,
        host: process.env.NOTES_DB_HOST,
        user: process.env.NOTES_DB_USER,
        password: process.env.NOTES_DB_PASS
    }
};

export const jwt = {
    secret: process.env.JWT_SIGNATURE,
    expiration: process.env.JWT_EXPIRY
};
