import { Router } from "express";
import { RequestUser } from "../../utils/types";
import { isAdmin, isFromApprovedDomain, isUser } from "../../middlewares/permissions";
import notesRouter from "./notes";
import usersRouter from "./users";
import contactRouter from "./contact";
import kindleRouter from "./kindle";
import billRouter from "./bills";
import rhythm_and_bluesRouter from "./rhythm_and_blues";

const router = Router();

router.get("/coffee", (req, res) => res.sendStatus(418));

router.get("/status", (req: RequestUser, res) => {
    res.status(200).json({ message: "API is responding" });
});

router.get("/status/auth", isUser, (req: RequestUser, res) => {
    res.status(200).json({
        message: "API is responding, auth service is responding",
        current_user_info: { id: req.user, roles: req.user.roles }
    });
});

router.get("/fizzBuzz", (req, res) => {
    const start = Number(req.query.start) || 1;
    const stop = Number(req.query.stop) || 100;
    const step = Number(req.query.step) || 1;
    const primeOne = Number(req.query.primeOne) || 3;
    const primeTwo = Number(req.query.primeTwo) || 5;
    const product = primeOne * primeTwo;
    const wordOne = req.query.wordOne || "Fizz";
    const wordTwo = req.query.wordTwo || "Buzz";
    const wordThree = req.query.wordThree || "FizzBuzz";

    const solution = [];

    for (let i = start; i <= stop; i += step) {
        if (i % product === 0) {
            solution.push(wordThree);
        } else if (i % primeOne === 0) {
            solution.push(wordOne);
        } else if (i % primeTwo === 0) {
            solution.push(wordTwo);
        } else {
            solution.push(i);
        }
    }
    res.json(solution);
});

router.use("/notes", notesRouter);
router.use("/users", usersRouter);
router.use("/contact", contactRouter);
router.use("/kindle", isAdmin, kindleRouter);
router.use("/bills", isFromApprovedDomain, billRouter);
router.use(["/rhythm_and_blues", "/hiphop", "/hip_hop", "/r&b"], rhythm_and_bluesRouter);

export default router;
