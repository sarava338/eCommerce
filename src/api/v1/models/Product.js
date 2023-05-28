import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("products", ProductSchema);
export default ProductModel;

export const createProduct = async (product) =>
  await new ProductModel(product).save();
export const findProductById = async (id) => await ProductModel.findById(id);
export const updateProductById = async (id) =>
  await ProductModel.findByIdAndUpdate(id);
export const deleteProductById = async (id) =>
  await ProductModel.findByIdAndDelete(id);
export const deleteManyProducts = async (condition) =>
  await ProductModel.deleteMany(condition);
