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
} from "../helpers/user.js";
import { statusCodes } from "../utils/constants.js";

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    if (!user)
      throw new Error("user not found to update", statusCodes.NOT_FOUND);
    res
      .status(statusCodes.OK)
      .json({ status: true, user: getUserDetails(user) });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await deleteUserById(req.params.id);
    if (!user)
      throw new Error("user not found to delete", statusCodes.NOT_FOUND);
    res
      .status(statusCodes.OK)
      .json({ status: true, user: getUserDetails(user) });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) throw new ApiError("User not found", statusCodes.NOT_FOUND);
    res
      .status(statusCodes.OK)
      .json({ status: true, user: getUserWithoutPassword(user) });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await findAllUsers();
    if (!users) throw new ApiError("no user found", statusCodes.NOT_FOUND);
    res
      .status(statusCodes.OK)
      .json({ status: true, users: getAllUsersWithoutPasswords(users) });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const blockUser = async (req, res) => {
  try {
    const user = await updateUserById(req.params.id, { isBlocked: true });
    if (!user)
      throw new ApiError("user not found to block", statusCodes.NOT_FOUND);
    res
      .status(statusCodes.OK)
      .json({ status: true, user: getUserWithoutPassword(user) });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const unBlockUser = async (req, res) => {
  try {
    const user = await updateUserById(req.params.id, { isBlocked: false });
    if (!user)
      throw new ApiError("user not found to unblock", statusCodes.NOT_FOUND);
    res
      .status(statusCodes.OK)
      .json({ status: true, user: getUserWithoutPassword(user) });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};
