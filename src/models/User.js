import mongoose from "mongoose";
import crypto from "crypto";
import constants from "../utils/constants.js";

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER" },
    isBlocked: { type: Boolean, default: false },
    passwordChangedAt: { type: Date },
    passwordResetToken: { type: String },
    passwordResetTokenExpires: { type: Date },
  },
  { timestamps: true }
);

// UserSchema.pre("save", async (next) => {
//   if (!this.isModified("password")) next();
// });

UserSchema.methods = {
  createResetPasswordToken() {
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.passwordResetTokenExpires = Date.now() + constants.TEN_MINS;
    return resetToken;
  },
};

const UserModel = mongoose.model("User", UserSchema);

export const createUser = async (user) => await new UserModel(user).save();
export const findUserByEmail = async (email) => await UserModel.findOne(email);
export const findUserById = async (id) => await UserModel.findById(id);
export const updateUserById = async (id, updatedUserData) =>
  await UserModel.findByIdAndUpdate(
    id,
    { $set: updatedUserData },
    { new: true }
  );
export const changePasswordById = async (id, password) => 
  await UserModel.findByIdAndUpdate(
    id,
    { $set: password },
    { new: true }
  );
export const deleteUserById = async (id) =>
  await UserModel.findByIdAndDelete(id);
export const findAllUsers = async () => await UserModel.find();