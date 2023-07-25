import express from "express";
import {
  getProduct,
  getAllProducts,
} from "../controllers/product.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/product").get(getAllProducts);
router
  .route("/product/:id")
  .get(verifyTokenAndAuthorization, mongoDbIdValidator, getProduct);

export default router;