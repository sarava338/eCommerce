import ApiError from "../libraries/ErrorHandler.js";
import {
  createOrder,
  deleteOrderById,
  findAllOrders,
  findOrderById,
  updateOrderById,
} from "../models/Order.js";
import { statusCodes } from "../utils/constants.js";

export const postOrder = async (req, res) => {
  try {
    const order = await createOrder(req.body);
    res.status(statusCodes.CREATED).json({ status: true, order });
  } catch (error) {
    if (error.code === 11000)
      res
        .status(statusCodes.CONFLICT)
        .json({ status: false, message: "Order already exists", error });
    else
      res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: false, error });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await findAllOrders();
    if (orders.length === 0)
      throw new ApiError("no odrder found", statusCodes.NOT_FOUND);
    else res.status(statusCodes.OK).json({ status: true, orders });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await findOrderById(req.params.id);
    if (!order) throw new ApiError("order not found", statusCodes.NOT_FOUND);
    res.status(statusCodes.OK).json({ status: true, order });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await updateOrderById(req.params.id, req.body);
    if (!order)
      throw new ApiError("order not found to update", statusCodes.NOT_FOUND);
    res.status(statusCodes.OK).json({ status: true, order });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await deleteOrderById(req.params.id);
    if (!order)
      throw new ApiError("order not found to delete", statusCodes.NOT_FOUND);
    res.status(statusCodes.OK).json({ status: true, order });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};
