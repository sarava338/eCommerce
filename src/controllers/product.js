import {
  createProduct,
  deleteProductById,
  findAllProducts,
  findProductById,
  updateProductById,
} from "../models/Product.js";
import {
  getFieldsBy,
  getFilteredQuery,
  getSkip,
  getSortBy,
} from "../helpers/mongoose.js";
import { statusCodes } from "../utils/constants.js";
import ApiError from "../libraries/ErrorHandler.js";

export const postProduct = async (req, res) => {
  try {
    const product = await createProduct(req.body);
    res.status(statusCodes.CREATED).json({ status: true, product });
  } catch (error) {
    if (error.code === 11000)
      return res
        .status(statusCodes.CONFLICT)
        .json({ status: false, message: "Product already exists", error });
    else
      res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: false, error });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let { sort, limit, page, fields, ...query } = req?.query;

    query = getFilteredQuery(query);
    sort = getSortBy(sort);
    fields = getFieldsBy(fields);
    const skip = getSkip(page, limit);

    const products = await findAllProducts(query, sort, fields, limit, skip);

    if (products.length === 0)
      throw new ApiError("no product found", statusCodes.NOT_FOUND);

    res.status(statusCodes.OK).json({ status: true, products });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await findProductById(req.params.id);
    if (!product)
      throw new ApiError("product not found", statusCodes.NOT_FOUND);
    res.status(statusCodes.OK).json({ status: true, product });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await updateProductById(req.params.id, req.body);
    if (!product)
      throw new ApiError("product not found to update", statusCodes.NOT_FOUND);
    res.status(statusCodes.OK).json({ status: true, product });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await deleteProductById(req.params.id);
    if (!product)
      throw new ApiError("product not found to delete", statusCodes.NOT_FOUND);
    res.status(statusCodes.OK).json({ status: true, product });
  } catch (error) {
    res
      .status(error.statusCode || statusCodes.INTERNAL_SERVER_ERROR)
      .json({ status: false, error });
  }
};
