import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userid: { type: String, required: true, unique: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("orders", OrderSchema);
export default OrderModel;
