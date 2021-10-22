import { Router } from "express";
import { Bills } from "../../../utils/types";
import * as db from "../../../db";
import { isAdmin } from "../../../utils/permissions";

const router = Router();

router.post("/", isAdmin, async (req, res, next) => {
    const { type_id, amount, payment_date }: Bills = req.body;

    if (!type_id || !amount || !payment_date) return res.status(400).json({ message: "Make sure you've got all fields filled out!" });

    try {
        const { insertId } = await db.bills.create_entry({ type_id, amount, payment_date });
        res.status(200).json({ message: "Entry successfully created", bill_id: insertId });
    } catch (error) {
        next(error);
    }
});

router.get("/types", async (req, res, next) => {
    try {
        const types = await db.bills.get_types();
        res.status(200).json(types);
    } catch (error) {
        next(error);
    }
});

router.get("/", isAdmin, async (req, res, next) => {
    try {
        const bills = await db.bills.get_all();
        res.status(200).json(bills);
    } catch (error) {
        next(error);
    }
});

export default router;
