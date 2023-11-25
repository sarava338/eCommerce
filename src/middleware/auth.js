import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { statusCodes } from "../utils/constants.js";
import ApiError, { sendError } from "../libraries/ErrorHandler.js";

export const verifyToken = (req, res, next) => {
  try {
    if (req?.headers?.authorization?.startsWith("Bearer")) {
      const token = req?.headers?.authorization?.split(" ")[1];
      jwt.verify(token, config.jwtSecret, (error, user) => {
        req.user = user;
        if (error) throw new ApiError(error.message, statusCodes.UNAUTHORIZED);
      });
    } else throw new ApiError("No token found", statusCodes.UNAUTHORIZED);
    next();
  } catch (error) {
    sendError(res, error);
  }
};

export const verifyTokenAndAdmin = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.role !== "ADMIN")
        throw new ApiError("Unauthorized admin", statusCodes.UNAUTHORIZED);
      next();
    });
  } catch (error) {
    sendError(res, error);
  }
};

export const verifyTokenAndUser = (req, res, next) => {
  try {
    verifyToken(req, res, () => {
      if (req.user.role !== "USER")
        throw new ApiError("Unauthorized user", statusCodes.UNAUTHORIZED);
      next();
    });
  } catch (error) {
    sendError(res, error);
  }
};
