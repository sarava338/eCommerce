import {
  deleteUserById,
  findAllUsers,
  findUserById,
  updateUserById,
} from "../models/User.js";
import { getUserWithoutPassword } from "../helpers/user.help.js";

export const updateUser = (req, res) => {
  updateUserById(req.params.id, { $set: req.body })
    .then((user) => {
      res.status(200).json(getUserWithoutPassword(user));
    })
    .catch((err) => res.status(409).json(err));
};

export const deleteUser = (req, res) => {
  deleteUserById(req.params.id)
    .then((ans) => res.status(204).json(ans))
    .catch((err) => res.status(409).json(err));
};

/** Admin Routes */
export const getUser = (req, res) => {
  findUserById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(404).json(err));
};

export const getAllUsers = (req, res) => {
  findAllUsers()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(404).json(err));
};
