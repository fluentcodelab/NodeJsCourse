import mongoose from "mongoose";
import { logger } from "./logging.js";
import config from "config";

export function db() {
  const db = config.get("db");
  mongoose
    .connect(db, { useUnifiedTopology: true })
    .then(() => logger.info(`Connected to ${db}...`));
}
