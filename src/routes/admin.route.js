import express from "express";
import adminUserRouter from "./adminRoutes/user.adminRoute.js";
import { verifyTokenAndAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

/** Ping Test */
router.get("/admin", verifyTokenAndAdmin, (req, res) => {
  res.status(200).send("hello admin");
});

router.use("/admin", verifyTokenAndAdmin, [adminUserRouter]);

export default router;
