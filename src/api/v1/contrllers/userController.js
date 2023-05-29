import { deleteUserById, updateUserById } from "../models/User.js";

export const updateUser = (req, res) => {
  updateUserById(req.user.id, { $set: req.body })
    .then((user) => res.status(202).json(user))
    .catch((err) => res.status(500).json(err));
};

export const deleteUser = (req, res) => {
  deleteUserById(req.user.id)
    .then((ans) => res.status(204).json())
    .catch((err) => res.status(500).json(err));
};
