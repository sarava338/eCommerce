import express from "express";
import { deleteUser, updateUser } from "../contrllers/user.controller.js";
import { verifyTokenAndAuthorization } from "../middleware/jwt.middleware.js";

const router = express.Router();

router.put("/user/:id", verifyTokenAndAuthorization, updateUser);

router.delete("/user/:id", verifyTokenAndAuthorization, deleteUser);

export default router;