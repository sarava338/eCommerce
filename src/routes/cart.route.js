import express from "express";
import {
  deleteCart,
  getCart,
  postCart,
  updateCart,
} from "../controllers/cart.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/cart", postCart);
router
  .route("/cart/:id")
  .get(mongoDbIdValidator, verifyTokenAndAuthorization, getCart)
  .put(mongoDbIdValidator, verifyTokenAndAuthorization, updateCart)
  .delete(mongoDbIdValidator, verifyTokenAndAuthorization, deleteCart)

export default router;