import { deleteUserById, updateUserById } from "../models/User.js";
import { getUserDetails } from "../helpers/user.help.js";

export const updateUser = (req, res) => {
  updateUserById(req.params.id, { $set: req.body })
    .then((user) => {
      res.status(200).json(getUserDetails(user));
    })
    .catch((err) => res.status(409).json(err));
};

export const deleteUser = (req, res) => {
  deleteUserById(req.params.id)
    .then((ans) => res.status(204).json(ans))
    .catch((err) => res.status(409).json(err));
};