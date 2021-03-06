import * as dotenv from "dotenv";
import { DBClusterConfig } from "../utils/types";

dotenv.config();

const DEV_PREFACE = process.env.NODE_ENV === "development" ? "DEV_" : "";

export const cors = {
    approvedDomains: process.env.CORS_APPROVED_DOMAINS,
    methods: process.env.CORS_APPROVED_METHODS
};

export const mailgunConfig = {
    username: process.env.MAILGUN_USERNAME,
    email: process.env.MAILGUN_EMAIL,
    key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN,
    receiving: process.env.MAILGUN_RECEIVING
};

export const sqlConfig: DBClusterConfig = {
    auth: {
        database: process.env[`${DEV_PREFACE}AUTH_DB_SCHEMA`],
        host: process.env[`${DEV_PREFACE}AUTH_DB_HOST`],
        user: process.env[`${DEV_PREFACE}AUTH_DB_USER`],
        password: process.env[`${DEV_PREFACE}AUTH_DB_PASS`]
    },
    notes: {
        database: process.env[`${DEV_PREFACE}NOTES_DB_SCHEMA`],
        host: process.env[`${DEV_PREFACE}NOTES_DB_HOST`],
        user: process.env[`${DEV_PREFACE}NOTES_DB_USER`],
        password: process.env[`${DEV_PREFACE}NOTES_DB_PASS`]
    },
    bill_tracker: {
        database: process.env[`${DEV_PREFACE}BILL_DB_SCHEMA`],
        host: process.env[`${DEV_PREFACE}BILL_DB_HOST`],
        user: process.env[`${DEV_PREFACE}BILL_DB_USER`],
        password: process.env[`${DEV_PREFACE}BILL_DB_PASS`]
    }
};

export const jwt = {
    secret: process.env.JWT_SIGNATURE,
    expiration: process.env.JWT_EXPIRY
};

export const kindle = {
    to: process.env.KINDLE_ADDRESS,
    from: process.env.KINDLE_APPROVED
};

export const twilio = {
    account_sid: process.env.TWILIO_ACCT_SID,
    auth_token: process.env.TWILIO_AUTH_TOKEN,
    phone_number: process.env.TWILIO_NUMBER
};

export const URL_BASE = process.env[`${DEV_PREFACE}URL_BASE`];
