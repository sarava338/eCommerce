import express from "express";
import {
  deleteOrder,
  getOrder,
  postOrder,
  updateOrder,
} from "../contrllers/order.controller.js";

const router = express.Router();

router.post("/order", postOrder);
router.get("/order/:id", getOrder);
router.put("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

export default router;