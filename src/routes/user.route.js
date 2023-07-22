import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { mongoDbIdValidator } from "../middleware/mongoose.middleware.js";
import { verifyTokenAndAuthorization } from "../middleware/auth.middleware.js";

const router = express.Router();

router
  .route("/user/:id")
  .put(mongoDbIdValidator, verifyTokenAndAuthorization, updateUser)
  .delete(mongoDbIdValidator, verifyTokenAndAuthorization, deleteUser);

export default router;