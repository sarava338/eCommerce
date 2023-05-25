import UserModel from "./models/User";
import ProductModel from "./models/Product";
import CartModel from "./models/Cart";
import OrderModel from "./models/Order";

//create docs for models relatively. It will return doc of model of schema of mongoose
export const createUser = async (user) => await new UserModel(user);
export const createProduct = async (product) => await new ProductModel(product);
export const createCart = async (cart) => await new CartModel(cart);
export const createOrder = async (order) => await new OrderModel(order);

// find the doc for models relatively. It will return doc
export const findUserById = async (id) => await UserModel.findById(id);
export const findProductById = async (id) => await ProductModel.findById(id);
export const findCartById = async (id) => await CartModel.findById(id);
export const findOrderById = async (id) => await OrderModel.findById(id);

// update the doc by id
export const updateUserById = async (id) =>
  await UserModel.findByIdAndUpdate(id);
export const updateProductById = async (id) =>
  await ProductModel.findByIdAndUpdate(id);
export const updateCartById = async (id) =>
  await CartModel.findByIdAndUpdate(id);
export const updateOrderById = async (id) =>
  await OrderModel.findByIdAndUpdate(id);

// delete the doc by id
export const deleteUserById = async (id) =>
  await UserModel.findByIdAndDelete(id);
export const deleteProductById = async (id) =>
  await ProductModel.findByIdAndDelete(id);
export const deleteCartById = async (id) =>
  await CartModel.findByIdAndDelete(id);
export const deleteOrderById = async (id) =>
  await OrderModel.findByIdAndDelete(id);

// delete many docs based on condition in respective models
export const deleteManyProducts = async (condition) =>
  await ProductModel.deleteMany(condition);
export const deleteManyCarts = async (condition) =>
  await CartModel.deleteMany(condition);
export const deleteManyOrders = async (condition) =>
  await OrderModel.deleteMany(condition);