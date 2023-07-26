import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    size: { type: String },
    color: { type: String },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

export const createProduct = async (product) =>
  await new ProductModel(product).save();
export const findAllProducts = async (query) => await ProductModel.find(query);
export const findProductById = async (id) => await ProductModel.findById(id);
export const updateProductById = async (id, updatedProductData) =>
  await ProductModel.findByIdAndUpdate(
    id,
    { $set: updatedProductData },
    { new: true }
  );
export const deleteProductById = async (id) =>
  await ProductModel.findByIdAndDelete(id);
export const deleteManyProducts = async (condition) =>
  await ProductModel.deleteMany(condition);