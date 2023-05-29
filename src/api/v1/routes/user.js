import express from "express";
import { verifyTokenAndAuthorization } from "../services/jwt.js";
import { deleteUser, updateUser } from "../contrllers/userController.js";

const router = express.Router();

router.put("/v1/user/:id", verifyTokenAndAuthorization, updateUser);

router.delete("/v1/user/:id", verifyTokenAndAuthorization, deleteUser);

export default router;