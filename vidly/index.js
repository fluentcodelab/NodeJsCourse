import "express-async-errors";
import express from "express";
import { logger } from "./startup/logging.js";
import { setConfig } from "./startup/config.js";
import { routes } from "./startup/routes.js";
import { db } from "./startup/db.js";
import { setValidation } from "./startup/validation.js";

const app = express();
routes(app);
db();
setConfig();
setValidation();

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
