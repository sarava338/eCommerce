import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyTokenAndUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/user/:id")
  .put(mongoDbIdValidator, verifyTokenAndUser, updateUser)
  .delete(mongoDbIdValidator, verifyTokenAndUser, deleteUser);

export default router;