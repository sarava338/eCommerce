import { deleteUserById, updateUserById } from "../models/User.js";
import { getUserDetails } from "../helpers/user.helper.js";

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