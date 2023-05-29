import CryptoJS from "crypto-js";

export const encryptPassword = (password) =>
  CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET);

export const decryptPassword = (encryptedPassword) =>
  CryptoJS.AES.decrypt(encryptedPassword, process.env.CRYPTO_SECRET).toString(
    CryptoJS.enc.Utf8
  );

// export const authenticationAndAutherization = () => {}