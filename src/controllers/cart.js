import {
  createCart,
  deleteCartById,
  findAllCarts,
  findCartById,
  updateCartById,
} from "../models/Cart.js";

export const postCart = (req, res) => {
  createCart(req.body)
    .then((cart) => res.status(201).json(cart))
    .catch((err) => res.json(err));
};

export const getAllCarts = (req, res) => {
  findAllCarts()
    .then((carts) => {
      if (carts.length === 0)
        res.status(404).json({ message: "No cart found" });
      else res.status(200).json(carts);
    })
    .catch((err) => res.json(err));
};

export const getCart = (req, res) => {
  findCartById(req.params.id)
    .then((cart) => {
      if (!cart) return res.status(404).json({ message: "cart not found" });
      res.status(200).json(cart);
    })
    .catch((err) => {
      if (err.code === 11000)
        res.status(409).json({ message: "Cart already exists", err });
      else res.status(500).json(err);
    });
};

export const updateCart = (req, res) => {
  updateCartById(req.params.id, req.body)
    .then((cart) => res.status(200).json(cart))
    .catch((err) => res.json(err));
};

export const deleteCart = (req, res) => {
  deleteCartById(req.params.id)
    .then((cart) => {
      if (!cart)
        return res.status(404).json({ message: "cart not found to delete" });
      res.status(202).json({ message: "cart deleted" });
    })
    .catch((err) => res.json(err));
};
