import express from "express";
import {
  login,
  logout,
  register,
  forgotPassword,
  updatePassword,
} from "../controllers/auth.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.patch("/auth/forgot-password", forgotPassword);
router.patch("/auth/reset-password/:token");
router.put(
  "/auth/change-password",
  verifyToken,
  mongoDbIdValidator,
  updatePassword
);

export default router;