import { findAllUsers, findUserById } from "../models/User.js";

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
