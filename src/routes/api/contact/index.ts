import * as express from "express";
import { mailgunConfig } from "../../../config";
import { send } from "../../../services/mailer";

const router = express.Router();

router.post("/", async (req, res) => {
    const { to } = req.body;
    try {
        const results = await send(to, `Thank You <thankyou@mydomain.lol>`, "Thanks for contacting!", "Lol");
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "An error occurred sending the contact info", error: error.message });
    }
});

export default router;
