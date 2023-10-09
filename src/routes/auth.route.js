import express from "express";
import {
  login,
  logout,
  register,
  forgotPassword,
  resetPassword,
  updatePassword,
} from "../controllers/auth.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.post("/auth/forgot-password", forgotPassword);
router.post("/auth/reset-password/:token", resetPassword);
router.put(
  "/auth/change-password",
  verifyToken,
  mongoDbIdValidator,
  updatePassword
);

export default router;