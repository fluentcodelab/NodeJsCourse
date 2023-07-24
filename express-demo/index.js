import express from "express";
import courses from "./routes/courses.js";
import home from "./routes/home.js";

const app = express();
app.use(express.json()); // Adds middleware that turns request body in json objects
app.use("/", home);
app.use("/api/courses", courses);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
