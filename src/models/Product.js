import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String },
    price: { type: Number, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;

export const createProduct = async (product) =>
  await new ProductModel(product).save();
export const findProductById = async (id) => await ProductModel.findById(id);
export const updateProductById = async (id, product) =>
  await ProductModel.findByIdAndUpdate(id, product);
export const deleteProductById = async (id) =>
  await ProductModel.findByIdAndDelete(id);
export const deleteManyProducts = async (condition) =>
  await ProductModel.deleteMany(condition);
