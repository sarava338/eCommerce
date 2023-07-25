import {
  createProduct,
  deleteProductById,
  findAllProducts,
  findProductById,
  findProductsByFilter,
  updateProductById,
} from "../models/Product.js";
import { getFilteredQuery } from "../helpers/mongoose.helper.js";

export const postProduct = (req, res) => {
  createProduct(req.body)
    .then((product) => res.status(201).json(product))
    .catch((err) => {
      if (err.code === 11000)
        res.status(409).json({ message: "Product already exists", err });
      else res.status(500).json(err);
    });
};

export const getAllProducts = (req, res) => {
  findAllProducts()
    .then((products) => {
      if (products.length === 0)
        res.status(404).json({ message: "No product found" });
      else res.status(200).json(products);
    })
    .catch((err) => res.json(err));
};

export const getProduct = (req, res) => {
  findProductById(req.params.id)
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "product not found" });
      res.status(200).json(product);
    })
    .catch((err) =>
      res.status(404).json({ message: "product not found", err })
    );
};

export const updateProduct = (req, res) => {
  updateProductById(req.params.id, req.body)
    .then((product) => res.status(200).json(product))
    .catch((err) => res.json(err));
};

export const deleteProduct = (req, res) => {
  deleteProductById(req.params.id)
    .then((product) => {
      if (!product)
        return res.status(404).json({ message: "product not found to delete" });
      res.status(202).json({ message: "product deleted" });
    })
    .catch((err) => res.json(err));
};

export const filterProducts = (req, res) => {
  const { sort, limit, page, fields, ...query } = req?.query;

  // SENDING Query to DB
  findProductsByFilter(getFilteredQuery(query))
    .then((filteredProducts) => {
      if (filteredProducts.length === 0)
        return res.status(404).json({ message: "No such product found" });
      res.status(200).json(filteredProducts);
    })
    .catch((err) => res.status(500).json(err));
};