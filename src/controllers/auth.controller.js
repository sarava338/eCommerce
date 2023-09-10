import { createUser, findUserByEmail } from "../models/User.js";
import { getUserDetails } from "../helpers/user.helper.js";
import { generateToken } from "../services/jwt.service.js";
import {
  decryptPassword,
  encryptPassword,
} from "../services/crypto.service.js";
import constants from "../utils/constants.js";

/** Register */
export const register = async (req, res) => {
  createUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: encryptPassword(req.body.password),
    role: req.body.role,
  })
    .then((user) => {
      const token = generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: constants.THREE_DAYS,
      });

      return res.status(201).json({
        ...getUserDetails(user),
      });
    })
    .catch((err) => {
      if (err.code == 11000 /** Dublicate resource code */)
        return res.status(409).json({ message: "User already exists" });
      return res.json(err);
    });
};

/** Login */
export const login = async (req, res) => {
  findUserByEmail({ email: req.body.email })
    .then((user) => {
      if (req.body.password !== decryptPassword(user.password))
        return res.status(403).json({ message: "Forbidden credential" });

      const token = generateToken(user);

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: constants.THREE_DAYS,
      });

      return res.status(200).json({
        ...getUserDetails(user),
      });
    })
    .catch((err) => res.json(err));
};

/** Logout */
export const logout = async (req, res) => {
  findUserByEmail({ email: req.body.email })
    .then((user) => {
      res.clearCookie("token", { httpOnly: true, secure: true });
      return res.status(204).json({ message: "User logged out successfully" });
    })
    .catch((err) => res.json(err));
}