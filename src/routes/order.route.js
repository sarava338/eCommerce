import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getOrder,
  postOrder,
  updateOrder,
} from "../controllers/order.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyTokenAndUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/order")
  .post(verifyTokenAndUser, postOrder)
  .get(verifyTokenAndUser, getAllOrders);
router
  .route("/order/:id")
  .get(mongoDbIdValidator, verifyTokenAndUser, getOrder)
  .put(mongoDbIdValidator, verifyTokenAndUser, updateOrder)
  .delete(mongoDbIdValidator, verifyTokenAndUser, deleteOrder);

export default router;