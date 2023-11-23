import express from "express";
import adminUserRouter from "./adminRoutes/user.js";
import adminProductRouter from "./adminRoutes/product.js";
import { verifyTokenAndAdmin } from "../middleware/auth.js";

const router = express.Router();

/** Ping Test */
router.get("/admin", verifyTokenAndAdmin, (req, res) => {
  res.status(200).send("hello admin");
});

router.use("/admin", verifyTokenAndAdmin, [
  adminUserRouter,
  adminProductRouter,
]);

export default router;
