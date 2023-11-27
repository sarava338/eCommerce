import constants, { statusCodes } from "../utils/constants.js";
import { getUserDetails } from "../helpers/user.js";
import { generateToken } from "../services/jwt.js";
import {
  createUser,
  findUserByEmail,
  changePasswordById,
} from "../models/User.js";
import { decryptPassword, encryptPassword } from "../services/crypto.js";
import ApiError, { sendError } from "../libraries/ErrorHandler.js";

export const register = async (req, res) => {
  try {
    const user = await createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: encryptPassword(req.body.password),
      role: req.body.role,
    });

    const token = await generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: constants.THREE_DAYS,
    });

    res
      .status(statusCodes.CREATED)
      .json({ status: true, user: getUserDetails(user) });
  } catch (error) {
    if (error.code === 11000)
      return sendError(res, error, statusCodes.CONFLICT, "User already exists");
    sendError(res, error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail({ email });

    if (!user) throw new ApiError("User not found", statusCodes.NOT_FOUND);
    if (password !== decryptPassword(user.password))
      throw new ApiError("Password not matched", statusCodes.UNAUTHORIZED);

    const token = await generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: constants.THREE_DAYS,
    });

    res.json({ status: true, user: getUserDetails(user) });
  } catch (error) {
    sendError(res, error);
  }
};

export const logout = async (req, res) => {
  try {
    const user = await findUserByEmail({ email: req.body.email });

    if (!user) throw new ApiError("User not found", statusCodes.NOT_FOUND);

    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    sendError(res, error);
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { password, ...otherData } = req.body;
    const user = await changePasswordById(id, {
      password: encryptPassword(password),
    });
    res.json({
      status: true,
      message: "password updated successfully",
      user,
    });
  } catch (error) {
    sendError(res, error);
  }
};
