import { express } from "express";
import {
  deleteProduct,
  getAllProducts,
  postProduct,
  updateProduct,
} from "../../controllers/product.controller";
import { mongoDbIdValidator } from "../../middleware/mongoose.middleware";

const router = express.Router();

router.route("/product").post(postProduct).get(getAllProducts);

router
  .route("/product/:id")
  .put(mongoDbIdValidator, updateProduct)
  .delete(mongoDbIdValidator, deleteProduct);

export default router;
