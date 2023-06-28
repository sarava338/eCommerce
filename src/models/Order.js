import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;

export const createOrder = async (order) => await new OrderModel(order).save();
export const findOrderById = async (id) => await OrderModel.findById(id);
export const updateOrderById = async (id) =>
  await OrderModel.findByIdAndUpdate(id);
export const deleteOrderById = async (id) =>
  await OrderModel.findByIdAndDelete(id);
export const deleteManyOrders = async (condition) =>
  await OrderModel.deleteMany(condition);
