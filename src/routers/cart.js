import express from "express";
import {
  deleteCart,
  getAllCarts,
  getCart,
  postCart,
  updateCart,
} from "../controllers/cart.js";
import { mongoDbIdValidator } from "../middleware/mongoose.js";
import { verifyTokenAndUser } from "../middleware/auth.js";

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
