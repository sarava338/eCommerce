import jwt from "jsonwebtoken";
import { config } from "../app.config.js";

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    config.jwtSecret,
    { expiresIn: "3d" }
  );
  return { token };
};
