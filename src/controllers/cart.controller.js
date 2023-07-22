import {
  createCart,
  deleteCartById,
  findCartById,
  updateCartById,
} from "../models/Cart.js";

export const postCart = (req, res) => {
  createCart(req.body)
    .then((cart) => res.status(201).json(cart))
    .catch((err) => res.json(err));
};

export const getCart = (req, res) => {
  findCartById(req.params.id)
    .then((cart) => {
      if (!cart) return res.status(404).json({ message: "cart not found" });
      res.status(200).json(cart);
    })
    .catch((err) => res.json(err));
};

export const updateCart = (req, res) => {
  updateCartById(req.params.id, { $set: req.body })
    .then((cart) => res.status(200).json(cart))
    .catch((err) => res.json(err));
};

export const deleteCart = (req, res) => {
  deleteCartById(req.params.id)
    .then((cart) => {
      if (!cart)
        return res.status(404).json({ message: "cart not found to delete" });
      res.status(202).json({ success: true, message: "cart deleted", cart });
    })
    .catch((err) => res.json(err));
};
