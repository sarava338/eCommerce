import express from "express";
import {
  deleteProduct,
  getProduct,
  postProduct,
  updateProduct,
} from "../contrllers/product.controller.js";

const router = express.Router();

router.post("/product", postProduct);
router.get("/product/:id", getProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;