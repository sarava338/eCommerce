import { createUser, findUserByUserName } from "../models/User.js";
import { decryptPassword, encryptPassword } from "../helpers/crypto.js";

export const register = async (req, res) => {
  createUser({
    username: req.body.username,
    email: req.body.email,
    password: encryptPassword(req.body.password),
    isAdmin: req.body.isAdmin,
  })
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err));
};

export const login = async (req, res) => {
  findUserByUserName({ username: req.body.username })
    .then((user) => {
      if (!user || req.body.password !== decryptPassword(user.password))
        return res.status(403).json({ message: "Forbidden" });
      res.status(200).json(user);
    })
    .catch((err) => res.status(500).json(err));
};
