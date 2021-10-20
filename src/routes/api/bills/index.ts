import { Router } from "express";
import { Bill } from "../../../../lib/types";

const router = Router();

router.post("/", async (req, res) => {
    const { type, amount, payment_date }: Bill = req.body;
});

export default router;
