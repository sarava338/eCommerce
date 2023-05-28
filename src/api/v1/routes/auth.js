import express from "express";
import { decryptPassword, encryptPassword } from "./../helpers/crypto.js";
import { createUser, findUserByUserName } from "../models/User.js";

const router = express.Router();

//SIGNUP
router.post("/auth/signup", async (req, res) => {
  createUser({
    username: req.body.username,
    email: req.body.email,
    password: encryptPassword(req.body.password),
    isAdmin: req.body.isAdmin,
  })
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err));
});

//LOGIN
router.post("/auth/login", async (req, res) => {
  findUserByUserName({ username: req.body.username })
    .then((user) => {
      if (!user || req.body.password !== decryptPassword(user.password))
        return res.status(403).json({ code: 403, message: "Forbidden" });
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json(err));
});

export default router;