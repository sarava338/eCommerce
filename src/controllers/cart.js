import ApiError from "../libraries/ErrorHandler.js";
import {
  createCart,
  deleteCartById,
  findAllCarts,
  findCartById,
  updateCartById,
} from "../models/Cart.js";
import { statusCodes } from "../utils/constants.js";

export const postCart = async (req, res) => {
  try {
    res.status(statusCodes.CREATED).json(await createCart(req.body));
  } catch (error) {
    if (error.code === 11000)
      res
        .status(statusCodes.CONFLICT)
        .json({ status: false, message: "Cart already exists", error });
    res
      .status(statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const getAllCarts = async (req, res) => {
  try {
    const carts = await findAllCarts();
    if (carts.length === 0)
      res.status(statusCodes.NOT_FOUND).json({ message: "No cart found" });
    else res.json({ status: true, carts });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await findCartById(req.params.id);
    if (!cart) throw new ApiError("cart not found", statusCodes.NOT_FOUND);
    res.json({ status: true, cart });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const updateCart = async (req, res) => {
  try {
    const cart = await updateCartById(req.params.id, req.body);
    if (!cart)
      throw new ApiError("cart not found to update", statusCodes.NOT_FOUND);
    res.json({ status: true, cart });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const cart = await deleteCartById(req.params.id);
    if (!cart)
      throw new ApiError("cart not found to delete", statusCodes.NOT_FOUND);
    res.json({ status: true, cart });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};
