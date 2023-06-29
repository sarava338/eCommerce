import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../contrllers/user.controller.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/jwt.middleware.js";

const router = express.Router();

router.put("/user/:id", verifyTokenAndAuthorization, updateUser);

router.delete("/user/:id", verifyTokenAndAuthorization, deleteUser);

/** Admin Routes */
router.get("/user/all", verifyTokenAndAdmin, getAllUsers)

router.get("/user/:id", verifyTokenAndAdmin, getUser)

export default router;