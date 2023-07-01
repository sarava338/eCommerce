import mongoose from "mongoose";

export const isMongoDbIdValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};
