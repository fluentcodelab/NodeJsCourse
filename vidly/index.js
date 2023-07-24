import express from "express";
import genres from "./routes/genres.js";

const app = express();
app.use(express.json()); // Adds middleware that turns request body in json objects
app.use("/api/genres", genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
