import mongoose from "mongoose";
import { logger } from "./logging.js";

export function db() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/vidly", { useUnifiedTopology: true })
    .then(() => logger.info("Connected to MongoDB..."));
}
