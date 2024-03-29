import ApiError, { sendError } from "../libraries/ErrorHandler.js";
import { isMongoDbIdValid } from "../utils/validator.js";
import { statusCodes } from "../utils/constants.js";

export const mongoDbIdValidator = (req, res, next) => {
  try {
    const id = req?.params?.id || req.user.id;
    if (!isMongoDbIdValid(id))
      throw new ApiError("mongoose id not valid", statusCodes.NOT_FOUND);
    next();
  } catch (error) {
    sendError(res, error);
  }
};
