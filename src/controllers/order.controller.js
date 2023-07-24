import {
  createOrder,
  deleteOrderById,
  findAllOrders,
  findOrderById,
  updateOrderById,
} from "../models/Order.js";

export const postOrder = (req, res) => {
  createOrder(req.body)
    .then((order) => res.status(201).json(order))
    .catch((err) => res.json(err));
};

export const getAllOrders = (req, res) => {
  findAllOrders()
    .then((orders) => res.status(200).json(orders))
    .catch((err) => res.json(err));
};

export const getOrder = (req, res) => {
  findOrderById(req.params.id)
    .then((order) => {
      if (!order) return res.status(404).json({ message: "order not found" });
      res.status(200).json(order);
    })
    .catch((err) => res.json(err));
};

export const updateOrder = (req, res) => {
  updateOrderById(req.params.id, req.body)
    .then((order) => res.status(200).json(order))
    .catch((err) => res.json(err));
};

export const deleteOrder = (req, res) => {
  deleteOrderById(req.params.id)
    .then((order) => {
      if (!order)
        return res.status(404).json({ message: "order not found to delete" });
      res
        .status(202)
        .json({ success: true, message: "order deleted", order });
    })
    .catch((err) => res.json(err));
};
