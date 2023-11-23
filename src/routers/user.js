import express from "express";
import { deleteUser, updateUser } from "../controllers/user.js";
import { mongoDbIdValidator } from "../middleware/mongoose.js";
import { verifyTokenAndUser } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/user/:id")
  .put(mongoDbIdValidator, verifyTokenAndUser, updateUser)
  .delete(mongoDbIdValidator, verifyTokenAndUser, deleteUser);

export default router;
