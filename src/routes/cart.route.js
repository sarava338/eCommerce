import express from "express";
import {
  deleteCart,
  getCart,
  postCart,
  updateCart,
} from "../contrllers/cart.controller.js";

const router = express.Router();

router.post("/cart", postCart);
router.get("/cart/:id", getCart);
router.put("/cart/:id", updateCart);
router.delete("/cart/:id", deleteCart);

export default router;