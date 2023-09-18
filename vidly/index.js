import mongoose from "mongoose";
import express from "express";
import genres from "./routes/genres.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const app = express();
app.use(express.json()); // Adds middleware that turns request body in json objects
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
