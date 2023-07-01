import {
  getAllUsersWithoutPasswords,
  getUserWithoutPassword,
} from "../helpers/user.help.js";
import { findAllUsers, findUserById, updateUserById } from "../models/User.js";

export const getUser = (req, res) => {
  findUserById(req.params.id)
    .then((user) => {
      if (user === null || user === {})
        return res.status(404).json({ message: "User not found" });
      else return res.status(200).json(getUserWithoutPassword(user));
    })
    .catch((err) => res.status(500).json(err));
};

export const getAllUsers = (req, res) => {
  findAllUsers()
    .then((users) => res.status(200).json(getAllUsersWithoutPasswords(users)))
    .catch((err) => res.status(500).json(err));
}

export const blockUser = (req, res) => {
  updateUserById(req.params.id, { $set: { isBlocked: true } }, { new: true })
    .then((user) =>
      res.status(200).json({
        message: "User blocked successfully",
        blocked: user.isBlocked,
      })
    )
    .catch((err) => res.status().json({ message: "User not blocked", err }));
};

export const unBlockUser = (req, res) => {
  updateUserById(req.params.id, { $set: { isBlocked: false } }, { new: true })
    .then((user) =>
      res.status(200).json({
        message: "User unblocked successfully",
        blocked: user.isBlocked,
      })
    )
    .catch((err) => res.status().json({ message: "User not unblocked", err }));
};
