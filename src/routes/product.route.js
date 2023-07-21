import express from "express";
import {
  deleteProduct,
  getProduct,
  postProduct,
  updateProduct,
} from "../contrllers/product.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/product", postProduct);
router
  .route("/product/:id")
  .get(mongoDbIdValidator, verifyTokenAndAuthorization, getProduct)
  .put(mongoDbIdValidator, verifyTokenAndAuthorization, updateProduct)
  .delete(mongoDbIdValidator, verifyTokenAndAuthorization, deleteProduct);

export default router;