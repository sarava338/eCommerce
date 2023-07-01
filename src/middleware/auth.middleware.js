import jwt from "jsonwebtoken";
import { config } from "../app.config.js";

export const verifyToken = (req, res, next) => {
  if (
    req?.cookies?.token ||
    req?.headers?.authorization?.startsWith("Bearer")
  ) {
    const token =
      req?.cookies?.token || req?.headers?.authorization?.split(" ")[1];
    jwt.verify(token, config.jwtSecret, (err, user) => {
      req.user = user;
      if (err) return res.status(403).json({ message: "Token not valid", err });
    });
  } else return res.status(400).json({ message: "No token found" });
  next();
};

export const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "ADMIN") next();
    else return res.status(401).json({ message: "Unauthorized admin" });
  });
};

export const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) next();
    else return res.status(401).json({ message: "Unauthorized user" });
  });
};
