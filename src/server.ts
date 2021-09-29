import * as express from "express";
import { configure, set_routes } from "./middlewares";

const app = express();

configure(app);
set_routes(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server's up at port ${port}`));
