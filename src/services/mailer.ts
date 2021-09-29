import MailgunTS from "mailgun.js";
import * as FormData from "form-data";
import Mailgun = require("mailgun.js");
import { mailgunConfig } from "../config";

const { key, username, domain } = mailgunConfig;

const mailer = new (<typeof MailgunTS>(<any>Mailgun))(<any>FormData).client({ key, username });

export const send = (to: string, from: string, subject: string, text: unknown) => {
    const data = { to, from, subject, text };

    return new Promise(async (resolve, reject) => {
        try {
            const results = await mailer.messages.create(domain, data);
            resolve(results);
        } catch (error) {
            console.log({ location: "send function catch block", error });
            reject(error);
        }
    });
};
