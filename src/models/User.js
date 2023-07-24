import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER" },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export const createUser = async (user) => await new UserModel(user).save();
export const findUserByEmail = async (email) => await UserModel.findOne(email);
export const findUserById = async (id) => await UserModel.findById(id);
export const updateUserById = async (id, updatedUserData) =>
  await UserModel.findByIdAndUpdate(id, { $set: updatedUserData });
export const deleteUserById = async (id) =>
  await UserModel.findByIdAndDelete(id);
export const findAllUsers = async () => await UserModel.find();