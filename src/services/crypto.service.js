import CryptoJS from "crypto-js";
import { config } from "../app.config.js";

export const encryptPassword = (password) =>
  CryptoJS.AES.encrypt(password, config.cryptoSycret);

export const decryptPassword = (encryptedPassword) =>
  CryptoJS.AES.decrypt(encryptedPassword, config.cryptoSycret).toString(
    CryptoJS.enc.Utf8
  );