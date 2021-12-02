import { Router } from "express";
import { isAdmin } from "../../../middlewares/permissions";
import * as https from "https";
import * as path from "path";
import * as fs from "fs";
import { send_with_attachments } from "../../../services/mailer";
import { kindle } from "../../../config";

const router = Router();

router.post("/", isAdmin, async (req, res) => {
    try {
        const { url } = req.body;
        const extension = path.extname(url);

        if (extension !== ".pdf") {
            return res.status(500).json({ message: "There was an error attempting to send the file", error: "Filetype not a pdf" });
        }

        const [filename] = url.split("/").slice(-1);
        const file = path.join(__dirname, filename);

        https.get(url, async response => {
            response.on("data", chunk => {
                fs.appendFile(file, chunk, err => {
                    if (err) {
                        return res.status(500).json({ message: "There was an error attempting to append to the local file", error: err });
                    }
                });
            });

            response.on("end", async () => {
                const { size } = fs.statSync(file);

                console.log({ size, kb: (size / 1024).toFixed(0), mb: (size / 1024 / 1024).toFixed(0) });

                if (size / 1024 / 1024 >= 25) {
                    return res
                        .status(500)
                        .json({ message: "There was an error attempting to send the file", error: "File larger than 25 MB" });
                }

                const enqueued = await send_with_attachments(kindle.to, kindle.from, "kindle", "kindle", file);

                if (enqueued) {
                    fs.unlink(file, err => {
                        if (err) {
                            res.status(500).json({ message: "File sending enqueued but deletion failed", enqueued, error: err });
                        } else {
                            res.status(202).json({ message: "File sending enqueued", enqueued });
                        }
                    });
                }
            });

            response.on("error", err => {
                return res.status(500).json({ message: "There was an error attempting to download the file", error: err });
            });
        });
    } catch (error) {
        res.status(500).json({ message: "There was an error attempting to send the file", error });
    }
});

export default router;
