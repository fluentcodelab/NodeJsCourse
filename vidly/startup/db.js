import mongoose from "mongoose";
import winston from "winston";

export function db() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/vidly")
    .then(() => winston.info("Connected to MongoDB..."));
}
