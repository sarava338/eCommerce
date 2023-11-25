import { statusCodes } from "../utils/constants.js";
import Log from "./Log.js";

export default class ApiError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export async function sendError(res, err, customCode, customMessage) {
  const error = {
    message: customMessage || err.message,
    code: customCode || err.code,
    stack: err.stack,
  };
  await res
    .status(error.code || statusCodes.INTERNAL_SERVER_ERROR)
    .json({ status: false, error });
  Log.error("APIERROR", error.code, error.message.replaceAll(" ", "_"));
}
