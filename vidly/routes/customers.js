import express from "express";
import { Customer, validate } from "../models/customer.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, phone, isGold } = req.body;
  let customer = new Customer({ name, phone, isGold });
  customer = await customer.save();

  res.send(customer);
});

export default router;
