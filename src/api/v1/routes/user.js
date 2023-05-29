import express from "express";
import { verifyTokenAndAuthorization } from "../services/jwt.service.js";
import { deleteUser, updateUser } from "../contrllers/user.controller.js";

const router = express.Router();

router.put("/v1/user/:id", verifyTokenAndAuthorization, updateUser);

router.delete("/v1/user/:id", verifyTokenAndAuthorization, deleteUser);

export default router;