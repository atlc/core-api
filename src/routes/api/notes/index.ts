import { Router } from "express";
import noteController from "../../../controllers/notes";

const router = Router();

const { create, get_one, edit, destroy, get_profile, change_pinned } = noteController;

router.route("/").post(create);
router.route("/:id").get(get_one).put(edit).delete(destroy);
router.route("/profile").get(get_profile);
router.route("/pin/:id/:pinned").put(change_pinned);

export default router;
