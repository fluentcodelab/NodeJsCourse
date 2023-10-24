import express from "express";

const router = express.Router();

router.post("/", async (req, res, next) => {
  res.status(401).send(`Unauthorized`);
});

export default router;
