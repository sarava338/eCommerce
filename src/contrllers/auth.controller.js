import { createUser, findUserByEmail } from "../models/User.js";
import { getToken } from "../services/jwt.service.js";
import {
  decryptPassword,
  encryptPassword,
} from "../services/crypto.service.js";
import { getUserWithoutPassword } from "../helpers/user.help.js";

/** Register */
export const register = async (req, res) => {
  createUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: encryptPassword(req.body.password),
    isAdmin: req.body.isAdmin,
  })
    .then((user) =>
      res.status(201).json({
        ...getUserWithoutPassword(user),
        ...getToken(user),
      })
    )
    .catch((err) => {
      if (err.code == 11000 /** Dublicate resource code */)
        return res.status(403).json({ message: "User already exists" });
      return res.status(500).json(err);
    });
};

/** Login */
export const login = async (req, res) => {
  findUserByEmail({ email: req.body.email })
    .then((user) => {
      if (req.body.password !== decryptPassword(user.password))
        return res.status(403).json({ message: "Forbidden credential" });

      res.status(200).json({
        ...getUserWithoutPassword(user),
        ...getToken(user),
      });
    })
    .catch((err) => res.status(404).json({ message: "User not found" }));
};
