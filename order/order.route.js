import Router from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "express-validator";
import Order from "./Order.js";

const router = Router();

router.get("/orders", async (req, res) => {
  const orders = await Order.find({ userId: req.body.userId });
  console.log(orders);
  res.send(orders);
});

router.post("/", async (req, res) => {
  try {
    const newOrder = await Order.create({ ...req.body });
    console.log(newOrder);
    res.send(newOrder);
  } catch (err) {
    res.status(501).json("Server Error");
  }
});

export default router;
