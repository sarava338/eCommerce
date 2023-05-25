import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true, unique: true },
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
