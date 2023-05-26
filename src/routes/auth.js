import express from "express";
import { createUser } from "../db.js";

const router = express.Router();

//SIGNUP
router.post("/auth/signup", async (req, res) => {
  createUser({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    isAdmin: req.body.isAdmin
  })
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err));
});

export default router;