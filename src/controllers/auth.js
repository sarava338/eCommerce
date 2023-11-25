import { config } from "../config.js";
import constants, { statusCodes } from "../utils/constants.js";
import { sendEmail } from "../services/mail.js";
import { getUserDetails } from "../helpers/user.js";
import { generateToken } from "../services/jwt.js";
import {
  createUser,
  findUserByEmail,
  changePasswordById,
  updateUserByEmail,
} from "../models/User.js";
import {
  decryptPassword,
  encryptPassword,
  createPasswordResetToken,
} from "../services/crypto.js";
import ApiError from "../libraries/ErrorHandler.js";

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
      return res
        .status(statusCodes.CONFLICT)
        .json({ status: false, message: "User already exists", error });
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
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
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const logout = async (req, res) => {
  try {
    const user = await findUserByEmail({ email: req.body.email });

    if (!user) throw new ApiError("User not found", statusCodes.NOT_FOUND);

    res.clearCookie("token", { httpOnly: true, secure: true });
    return res.status(statusCodes.NO_CONTENT).send();
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

/** Change Password */
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
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const forgotPassword = async (req, res) => {
  const { email, ...otherData } = req.body;
  try {
    const { passwordRandomString, passwordResetToken } =
      createPasswordResetToken();
    const passwordResetTokenExpires = Date.now() + constants.TEN_MINS;

    const user = await updateUserByEmail(email, {
      passwordResetToken,
      passwordResetTokenExpires,
    });
    if (!user) throw new ApiError("user not found", statusCodes.NOT_FOUND);

    const { protocol, host, port, apiBasePath } = config;
    const resetUrl = `${protocol}://${host}:${port}${apiBasePath}/auth/reset-password/${passwordRandomString}`;

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

    const emailSentResponse = await sendEmail({
      to: user.email,
      text: `Hey ${user.firstName}`,
      subject: "SaraCart - Password change Request recieved",
      html: message,
    });

    res.json({
      status: true,
      message: `password reset email has been sent : message - ${emailSentResponse.response}`,
      token: passwordRandomString, //for testing only
    });
  } catch (error) {
    await updateUserByEmail(email, {
      passwordResetToken: null,
      passwordResetTokenExpires: null,
    });
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    res.json({ token });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};
