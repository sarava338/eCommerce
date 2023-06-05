import { createUser, findUserByUserName } from "../models/User.js";
import { getToken } from "../services/jwt.service.js";
import { decryptPassword, encryptPassword } from "../services/crypto.service.js";
import { getUserWithoutPassword } from "../helpers/user.help.js";

/** Register */
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

/** Login */
export const login = async (req, res) => {
  findUserByUserName({ username: req.body.username })
    .then((user) => {
      if (req.body.password !== decryptPassword(user.password))
        return res.status(403).json({ message: "Forbidden credential" });

      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({
        ...getUserWithoutPassword(user),
        ...getToken(user)
      });
    })
    .catch((err) => res.status(404).json({ message: "User not found" }));
};
