import "winston-mongodb";
import { createLogger, format, transports } from "winston";
import "express-async-errors";
import mongoose from "mongoose";
import express from "express";
import Joi from "joi";
import objectId from "joi-objectid";
import config from "config";
import { loadRoutes } from "./startup/loadRoutes.js";

const app = express();
loadRoutes(app);

const { combine, timestamp, label, prettyPrint } = format;
const logger = createLogger({
  format: combine(
    timestamp({
      format: "MMM-DD-YYYY HH:mm:ssZ",
    }),
    prettyPrint(),
    format.metadata(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.MongoDB({ db: "mongodb://127.0.0.1:27017/vidly" }),
  ],
});

// process.on("uncaughtException", (e) => {
//   logger.error(e.message, e);
//   process.exit(1);
// });

logger.exceptions.handle(
  new transports.File({ filename: "uncaughtException.log" }),
);

process.on("unhandledRejection", (e) => {
  // logger.error(e.message, e);
  // process.exit(1);
  throw e;
});

const p = Promise.reject(new Error("Something failed terribly..."));
p.then(() => console.log("Done"));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

Joi.objectId = objectId(Joi);

mongoose
  .connect("mongodb://127.0.0.1:27017/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
