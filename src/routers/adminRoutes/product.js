import express from "express";
import {
  deleteProduct,
  getAllProducts,
  postProduct,
  updateProduct,
} from "../../controllers/product.js";
import { mongoDbIdValidator } from "../../middleware/mongoose.js";

const router = express.Router();

router.route("/product").post(postProduct).get(getAllProducts);

router
  .route("/product/:id")
  .put(mongoDbIdValidator, updateProduct)
  .delete(mongoDbIdValidator, deleteProduct);

export default router;
