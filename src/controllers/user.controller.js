import {
  deleteUserById,
  updateUserById,
  findAllUsers,
  findUserById,
} from "../models/User.js";
import {
  getUserDetails,
  getAllUsersWithoutPasswords,
  getUserWithoutPassword,
} from "../helpers/user.helper.js";

export const updateUser = (req, res) => {
  updateUserById(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(getUserDetails(user));
    })
    .catch((err) => res.json(err));
};

export const deleteUser = (req, res) => {
  deleteUserById(req.params.id)
    .then((user) => res.status(202).json({ message: "User deleted" }))
    .catch((err) => res.json(err));
};

export const getUser = (req, res) => {
  findUserById(req.params.id)
    .then((user) => {
      if (user === null || user === {})
        return res.status(404).json({ message: "User not found" });
      else return res.status(200).json(getUserWithoutPassword(user));
    })
    .catch((err) => res.json(err));
};

export const getAllUsers = (req, res) => {
  findAllUsers()
    .then((users) => {
      if (users.length === 0)
        res.status(404).json({ message: "No user found" });
      else res.status(200).json(getAllUsersWithoutPasswords(users));
    })
    .catch((err) => res.json(err));
};

export const blockUser = (req, res) => {
  updateUserById(req.params.id, { isBlocked: true })
    .then((user) =>
      res.status(200).json({
        message: "User blocked successfully",
        blocked: user.isBlocked,
      })
    )
    .catch((err) => res.json(err));
};

export const unBlockUser = (req, res) => {
  updateUserById(req.params.id, { isBlocked: false })
    .then((user) =>
      res.status(200).json({
        message: "User unblocked successfully",
        blocked: user.isBlocked,
      })
    )
    .catch((err) => res.json(err));
};
