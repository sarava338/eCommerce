import express from "express";
import {
  blockUser,
  getAllUsers,
  getUser,
  unBlockUser,
} from "../../contrllers/admin.controller.js";

const router = express.Router();

router.get("/user/all", getAllUsers);

router.get("/user/:id", getUser);

router.put("/user/block/:id/", blockUser);

router.put("/user/unblock/:id", unBlockUser);

export default router;
