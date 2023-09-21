import "winston-mongodb";
import "express-async-errors";
import express from "express";
import Joi from "joi";
import objectId from "joi-objectid";
import config from "config";
import { routes } from "./startup/routes.js";
import { db } from "./startup/db.js";

const app = express();
routes(app);
db();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

Joi.objectId = objectId(Joi);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
