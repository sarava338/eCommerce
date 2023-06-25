import {
  createOrder,
  deleteOrderById,
  findOrderById,
  updateOrderById,
} from "../models/Order.js";

export const postOrder = (req, res) => {
  createOrder(req.body)
    .then((order) => res.status(201).json(order))
    .catch((err) => res.status(500).json(err));
};

export const getOrder = (req, res) => {
  findOrderById(req.params.id)
    .then((order) => {
      if (!order)
        return res.status(404).json({ message: "order not found" });
      res.status(200).json(order);
    })
    .catch((err) =>
      res.status(404).json({ message: "order not found", err })
    );
};

export const updateOrder = (req, res) => {
  updateOrderById(req.params.id, { $set: req.body })
    .then((order) => res.status(200).json(order))
    .catch((err) => res.status(409).json(err));
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
    .catch((err) => res.status(500).json(err));
};
