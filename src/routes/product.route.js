import express from "express";
import {
  deleteProduct,
  getAllProducts,
  getProduct,
  postProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/product")
  .post(verifyTokenAndAuthorization, postProduct)
  .get(verifyTokenAndAuthorization, getAllProducts);
router
  .route("/product/:id")
  .get(mongoDbIdValidator, verifyTokenAndAuthorization, getProduct)
  .put(mongoDbIdValidator, verifyTokenAndAuthorization, updateProduct)
  .delete(mongoDbIdValidator, verifyTokenAndAuthorization, deleteProduct);

export default router;