import express from "express";
import {
  blockUser,
  getAllUsers,
  getUser,
  unBlockUser,
} from "../../controllers/user.controller.js";
import { mongoDbIdValidator } from "../../middleware/mongoose.middleware.js";

const router = express.Router();

router.get("/user", getAllUsers);
router.get("/user/:id", mongoDbIdValidator, getUser);
router.put("/user/block/:id/", mongoDbIdValidator, blockUser);
router.put("/user/unblock/:id", mongoDbIdValidator, unBlockUser);

export default router;
