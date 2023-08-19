import express from "express";
import {
  deleteCart,
  getAllCarts,
  getCart,
  postCart,
  updateCart,
} from "../controllers/cart.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyTokenAndUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/cart")
  .post(verifyTokenAndUser, postCart)
  .get(verifyTokenAndUser, getAllCarts);
router
  .route("/cart/:id")
  .get(mongoDbIdValidator, verifyTokenAndUser, getCart)
  .put(mongoDbIdValidator, verifyTokenAndUser, updateCart)
  .delete(mongoDbIdValidator, verifyTokenAndUser, deleteCart);

export default router;