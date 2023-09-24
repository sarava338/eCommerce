import { isMongoDbIdValid } from "../utils/validator.js";

export const mongoDbIdValidator = (req, res, next) => {
  const id = req?.params?.id || req.user.id;
  if (!isMongoDbIdValid(id))
    return res.status(404).json({ message: "mongoose id not valid" });
  else next();
};
