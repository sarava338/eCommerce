import express from "express";
import {
  deleteOrder,
  getAllOrders,
  getOrder,
  postOrder,
  updateOrder,
} from "../controllers/order.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/order")
  .post(verifyTokenAndAuthorization, postOrder)
  .get(verifyTokenAndAuthorization, getAllOrders);
router
  .route("/order/:id")
  .get(mongoDbIdValidator, verifyTokenAndAuthorization, getOrder)
  .put(mongoDbIdValidator, verifyTokenAndAuthorization, updateOrder)
  .delete(mongoDbIdValidator, verifyTokenAndAuthorization, deleteOrder)

export default router;