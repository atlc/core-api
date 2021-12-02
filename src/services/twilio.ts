import { Twilio } from "twilio";
import { twilio as twilio_conf } from "../config";

const client = new Twilio(twilio_conf.account_sid, twilio_conf.auth_token);

export const send_sms = (to: string, body: string) => {
    return client.messages.create({
        from: twilio_conf.phone_number,
        to,
        body
    });
};
