import MailgunTS from "mailgun.js";
import * as FormData from "form-data";
import Mailgun = require("mailgun.js");
import { mailgunConfig } from "../config";
import * as fs from "fs";

const { key, username, domain } = mailgunConfig;

import * as mg3rdparty from "mailgun-js";
const mg3 = mg3rdparty({ apiKey: key, domain });

const mailer = new (<typeof MailgunTS>(<any>Mailgun))(<any>FormData).client({ key, username });

export const send_with_attachments = (to: string, from: string, subject: string, text: string, attachment: string) => {
    const file = fs.readFileSync(attachment);
    const { size } = fs.statSync(attachment);
    const [filename] = attachment.split("/").slice(-1);

    const attch = new mg3.Attachment({ data: file, filename, contentType: "application/pdf", knownLength: size });

    const data = { to, from, subject, text, attachment: attch };
    console.log({ data });

    return new Promise(async (resolve, reject) => {
        try {
            mg3.messages().send(data, (error, body) => {
                if (error) return reject(error);
                resolve(body);
            });
        } catch (error) {
            console.log({ location: "send function catch block", error });
            reject(error);
        }
    });
};

export const send = (to: string, from: string, subject: string, text: unknown) => {
    const data: { [key: string]: string | number | unknown } = { to, from, subject, text };

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
