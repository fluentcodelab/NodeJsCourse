import express from "express";
import { logger } from "./startup/logging.js";
import { setConfig } from "./startup/config.js";
import { routes } from "./startup/routes.js";
import { db } from "./startup/db.js";
import { setValidation } from "./startup/validation.js";
import { prod } from "./startup/prod.js";

const app = express();
routes(app);
db();
setConfig();
setValidation();
prod(app);

const port = process.env.PORT || 3000;
export const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`),
);
