import "winston-mongodb";
import { createLogger, format, transports } from "winston";
import "express-async-errors";
import mongoose from "mongoose";
import express from "express";
import Joi from "joi";
import objectId from "joi-objectid";
import config from "config";
import { error } from "./middleware/error.js";
import genres from "./routes/genres.js";
import customers from "./routes/customers.js";
import movies from "./routes/movies.js";
import rentals from "./routes/rentals.js";
import users from "./routes/users.js";
import auth from "./routes/auth.js";

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

process.on("uncaughtException", (e) => {
  console.log("WE GOT AN UNCAUGHT EXCEPTION.");
  logger.error(e.message, e);
});

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

Joi.objectId = objectId(Joi);

mongoose
  .connect("mongodb://127.0.0.1:27017/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const app = express();
app.use(express.json()); // Adds middleware that turns request body in json objects
app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
