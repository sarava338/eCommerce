import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;

export const createUser = async (user) => await new UserModel(user).save();
export const findUserByUserName = async (username) =>
  await UserModel.findOne(username);
export const findUserById = async (id) => await UserModel.findById(id);
export const updateUserById = async (id, user) =>
  await UserModel.findByIdAndUpdate(id, user, { new: true });
export const deleteUserById = async (id) =>
  await UserModel.findByIdAndDelete(id);
