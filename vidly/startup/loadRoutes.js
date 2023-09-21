import express from "express";
import genres from "../routes/genres.js";
import customers from "../routes/customers.js";
import movies from "../routes/movies.js";
import rentals from "../routes/rentals.js";
import users from "../routes/users.js";
import auth from "../routes/auth.js";
import { error } from "../middleware/error.js";

export function loadRoutes(app) {
  app.use(express.json()); // Adds middleware that turns request body in json objects
  app.use("/api/genres", genres);
  app.use("/api/customers", customers);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
}
