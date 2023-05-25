import express from "express";
import { createUser } from "../db.js";

const router = express.Router();

router.post("/auth/signup", async (req, res) => {
  createUser({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err));
});

export default router;
