import express from "express";
import {
  deleteOrder,
  getOrder,
  postOrder,
  updateOrder,
} from "../controllers/order.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/order", postOrder);
router
  .route("/order/:id")
  .get(mongoDbIdValidator, verifyTokenAndAuthorization, getOrder)
  .put(mongoDbIdValidator, verifyTokenAndAuthorization, updateOrder)
  .delete(mongoDbIdValidator, verifyTokenAndAuthorization, deleteOrder)

export default router;