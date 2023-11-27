import { statusCodes } from "../utils/constants.js";
import Log from "./Log.js";

export default class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export async function sendError(
  res,
  err,
  customCode = err.code,
  customMessage
) {
  try {
    const error = {
      ...err,
      message: customMessage || err.message,
      code:
        customCode instanceof Number
          ? customCode
          : statusCodes.INTERNAL_SERVER_ERROR,
      stack: err.stack,
    };
    await res.status(error.code).json({ status: false, error });
    Log.error("APIERROR", error.code, error.message.replaceAll(" ", "_"));
  } catch (error) {
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, message: "error in error handler", error });
    Log.error("SERVERERROR", error.message.replaceAll(" ", "_"));
  }
}
