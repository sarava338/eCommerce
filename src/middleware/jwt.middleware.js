import jwt from "jsonwebtoken";
import { config } from "../app.config.js";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers;

  if (!authHeader.token)
    return res.status(400).json({ message: "no token" });

  const token = authHeader.token.split(" ")[1];

  jwt.verify(token, config.jwtSecret, (err, user) => {
    req.user = user;
    if (err) return res.status(403).json({ message: "Token not valid", err });
  });

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
    if (!(req.user.id === req.params.id || req.user.role === "ADMIN"))
      return res.status(401).json({ message: "Unauthorized user" });
    else next();
  });
};
