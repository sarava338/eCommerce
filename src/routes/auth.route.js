import express from "express";
import { login, register } from "../contrllers/auth.controller.js";

const router = express.Router();

// router.use("/v1/auth", register, login)

//REGISTER
router.post("/auth/register", register);

//LOGIN
router.post("/auth/login", login);

export default router;