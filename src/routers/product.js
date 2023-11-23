import express from "express";
import { getProduct, getAllProducts } from "../controllers/product.js";
import { mongoDbIdValidator } from "../middleware/mongoose.js";
import { verifyTokenAndUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/product").get(getAllProducts);

router
  .route("/product/:id")
  .get(verifyTokenAndUser, mongoDbIdValidator, getProduct);

export default router;
