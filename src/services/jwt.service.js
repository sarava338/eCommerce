import jwt from "jsonwebtoken";
import { config } from "../app.config.js";

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.jwtSecret,
    { expiresIn: "3d" }
  );
  return token;
};
