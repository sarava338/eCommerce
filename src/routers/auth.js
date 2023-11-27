import express from "express";
import {
  login,
  logout,
  register,
  updatePassword,
} from "../controllers/auth.js";
import { mongoDbIdValidator } from "../middleware/mongoose.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.put(
  "/auth/change-password",
  verifyToken,
  mongoDbIdValidator,
  updatePassword
);

export default router;
