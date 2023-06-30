import express from "express";
import { getAllUsers, getUser } from "../../contrllers/admin.controller.js";

const router = express.Router();

router.get("/user/all", getAllUsers);

router.get("/user/:id", getUser);

export default router;
