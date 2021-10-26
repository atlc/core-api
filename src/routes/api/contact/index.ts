import * as express from "express";
import { mailgunConfig, cors } from "../../../config";
import { send } from "../../../services/mailer";
import { isAdmin } from "../../../utils/permissions";

const router = express.Router();

router.post("/me", async (req, res) => {
    try {
        const originating_domain = req.headers.origin;
        const { approvedDomains } = cors;

        if (!approvedDomains.includes(originating_domain)) return res.status(400).json({ message: "Unapproved domain." });

        const { email, message } = req.body;

        if (!email || !message) return res.status(400).json({ message: "Missing either the email or message fields" });

        const results = await send(
            mailgunConfig.receiving,
            `contact_request@atlc.dev`,
            "A new contact request has been sent via your portfolio",
            `From ${email}:\n\n${message}`
        );
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "An error occurred sending the contact info", error: error.message });
    }
});

router.post("/", isAdmin, async (req, res) => {
    const { to } = req.body;
    try {
        const results = await send(to, `Thank You <thankyou@mydomain.lol>`, "Thanks for contacting!", "Lol");
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "An error occurred sending the contact info", error: error.message });
    }
});

export default router;
