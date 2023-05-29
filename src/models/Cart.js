import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const CartModel = mongoose.model("carts", CartSchema);
export default CartModel;

export const createCart = async (cart) => await new CartModel(cart).save();
export const findCartById = async (id) => await CartModel.findById(id);
export const updateCartById = async (id) =>
  await CartModel.findByIdAndUpdate(id);
export const deleteCartById = async (id) =>
  await CartModel.findByIdAndDelete(id);
export const deleteManyCarts = async (condition) =>
  await CartModel.deleteMany(condition);