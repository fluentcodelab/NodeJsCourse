import "express-async-errors";
import express from "express";
import Joi from "joi";
import objectId from "joi-objectid";
import "./startup/logging.js";
import { setConfig } from "./startup/config.js";
import { routes } from "./startup/routes.js";
import { db } from "./startup/db.js";

const app = express();
routes(app);
db();
setConfig();

Joi.objectId = objectId(Joi);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
