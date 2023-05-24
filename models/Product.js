const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
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

module.exports = mongoose.model("Product", ProductSchema);
