import CryptoJS from "crypto-js";
import crypto from "crypto";
import { config } from "../app.config.js";

export const encryptPassword = (password) =>
  CryptoJS.AES.encrypt(password, config.cryptoSycret).toString();

export const decryptPassword = (encryptedPassword) =>
  CryptoJS.AES.decrypt(encryptedPassword, config.cryptoSycret).toString(
    CryptoJS.enc.Utf8
  );

export const createPasswordResetToken = () => {
  const passwordRandomString = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(passwordRandomString)
    .digest("hex");
  return { passwordRandomString, passwordResetToken };
};