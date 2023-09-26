import { config } from "../app.config.js";
import constants from "../utils/constants.js";
import { sendEmail } from "../services/mail.service.js";
import { getUserDetails } from "../helpers/user.helper.js";
import { generateToken } from "../services/jwt.service.js";
import {
  createUser,
  findUserByEmail,
  changePasswordById,
  updateUserById,
  updateUserByEmail,
} from "../models/User.js";
import {
  decryptPassword,
  encryptPassword,
  createPasswordResetToken,
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

/** Change Password */
export const updatePassword = async (req, res) => {
  const { id } = req.user;
  const { password, ...otherData } = req.body;
  changePasswordById(id, { password: encryptPassword(password) })
    .then((user) => {
      res.status(200).json({
        message: "password updated successfully",
        email: user.email,
      });
    })
    .catch((error) => res.json({ message: "password not updated", error }));
};

export const forgotPassword = async (req, res) => {
  const { email, ...otherData } = req.body;

  const { passwordRandomString, passwordResetToken } =
    createPasswordResetToken();
  const passwordResetTokenExpires = Date.now() + constants.TEN_MINS;

  const user = await updateUserByEmail(email, {
    passwordResetToken,
    passwordResetTokenExpires,
  });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetUrl = `http://localhost:8080/api/v1/auth/reset-password/${passwordRandomString}`;

  const message = `<h1>Hi ${user.firstName},</h1><br/><br/>
      We have recieved a password reset request. To reset the password please click the below link.
      <br/><br/>
      link: <a href="${resetUrl}">Click here</a>
      <br/><br/>
      If above like not worked, Please paste the below link in a browser
      <br/><br/>
      ${resetUrl}
      <br/><br/>
      This password reset link will be valid only for next 10 mins
      <br/><br/><br/><br/>
      By,
      SaraCart`;

  try {
    const emailSentResponse = await sendEmail({
      to: user.email,
      text: `Hey ${user.firstName}`,
      subject: "SaraCart - Password change Request recieved",
      html: message,
    });

    res.status(200).json({
      status: "success",
      message: `password reset email has been sent : message - ${emailSentResponse.response}`,
      token: passwordRandomString,
    });
  } catch (error) {
    await updateUserByEmail(email, {
      passwordResetToken: null,
      passwordResetTokenExpires: null,
    });
    res.status(500).json({
      message: `not able to send password reset email : error - ${error.message}`,
      error,
    });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
};