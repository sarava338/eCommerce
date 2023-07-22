import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

// router.use("/v1/auth", register, login, logout)

//REGISTER
router.post("/auth/register", register);

//LOGIN
router.post("/auth/login", login);

//LOGOUT
router.post("/auth/logout", logout);

export default router;