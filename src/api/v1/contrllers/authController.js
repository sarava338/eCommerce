import { createUser, findUserByUserName } from "../models/User.js";
import { decryptPassword, encryptPassword } from "../helpers/crypto.js";
import jwt from "jsonwebtoken";

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
      if (!user) return res.status(401).json({ message: "Unauthorized user" });
      if (req.body.password !== decryptPassword(user.password))
        return res.status(403).json({ message: "Forbidden" });

      const { password, ...userWithoutPassword } = user._doc;

      const accessToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );

      res.status(200).json({ ...userWithoutPassword, accessToken });
    })
    .catch((err) => res.status(500).json(err));
};
