import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getOrder,
  postOrder,
  updateOrder,
} from "../controllers/order.js";
import { mongoDbIdValidator } from "../middleware/mongoose.js";
import { verifyTokenAndUser } from "../middleware/auth.js";

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
