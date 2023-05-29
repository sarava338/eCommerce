import express from "express";
import { login, register } from "../contrllers/auth.controller.js";

const router = express.Router();

// router.use("/v1/auth", register, login)

//REGISTER
router.post("/v1/auth/register", register);

//LOGIN
router.post("/v1/auth/login", login);

export default router;