import { config } from "../app.config.js";
import constants from "../utils/constants.js";
import { sendEmail } from "../services/mail.service.js";
import { getUserDetails } from "../helpers/user.helper.js";
import { generateToken } from "../services/jwt.service.js";
import {
  createUser,
  findUserByEmail,
  changePasswordById,
} from "../models/User.js";
import {
  decryptPassword,
  encryptPassword,
} from "../services/crypto.service.js";

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
};

export const updatePassword = async (req, res) => {
  const { id } = req.user;
  const { password, ...otherData } = req.body;
  changePasswordById(id, { password })
    .then((user) => {
      res.status(200).json({
        message: "password updated successfully",
        email: user.email,
      });
    })
    .catch((error) => res.json({ message: "password not updated", error }));
};

export const forgotPassword = async (req, res) => {
  findUserByEmail({ email: req.body.email })
    .then(async (user) => {
      if (!user) return res.status(404).json({ message: "User not found" });

      const resetToken = user.createResetPasswordToken();
      await user.save({ validateBeforeSave: false });

      const resetUrl = `${req.protocol}://${req.get("host")}${
        config.apiBasePath
      }/auth/reset-password/${resetToken}`;

      const message = `Hi ${user.firstName},
      We have recieved a password reset request. To reset the password please click the below link
      
      link: ${resetUrl}
      
      This password reset link will be valid only for next 10 mins
      
      
      By,
      SaraCart.`;

      try {
        await sendEmail({
          email: user.email,
          subject: "SaraCart - Password change Request recieved",
          message: message,
        });

        res.status(200).json({
          status: "success",
          message: "password reset email has been sent",
        });
      } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });
        res.json({ message: "not able to send password reset email", error });
      }
    })
    .catch((error) => res.json({ message: "User Not found", error }));
};
