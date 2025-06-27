import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, maxlength: 255 },
  description: String,
  price: { type: Number, required: true, min: 0 },
  currency: { type: String, required: true },
  category: { type: String, required: true },
  brand: String,
  sku: { type: String, required: true, unique: true },
  stock_quantity: { type: Number, required: true, min: 0 },
  images: [String],
  tags: [String],
  is_active: { type: Boolean, required: true }
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
