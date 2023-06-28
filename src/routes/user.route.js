import express from "express";
import { verifyTokenAndAuthorization } from "../services/jwt.service.js";
import { deleteUser, updateUser } from "../contrllers/user.controller.js";

const router = express.Router();

router.put("/user/:id", verifyTokenAndAuthorization, updateUser);

router.delete("/user/:id", verifyTokenAndAuthorization, deleteUser);

export default router;