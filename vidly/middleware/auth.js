import jwt from "jsonwebtoken";
import config from "config";

export function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied.");

  try {
    req.user = jwt.verify(token, config.get("jwtPrivateKey"));
    next();
  } catch (e) {
    res.status(400).send("Invalid token.");
  }
}
