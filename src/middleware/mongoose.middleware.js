import { isMongoDbIdValid } from "../utils/validator.js";

export const mongoDbIdValidator = (req, res, next) => {
  if (!isMongoDbIdValid(req.params.id))
    return res.status(404).json({ message: "mongoose id not valid" });
  else next();
};
