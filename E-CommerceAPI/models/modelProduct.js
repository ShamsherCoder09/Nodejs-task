import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String }
  },
  { timestamps: true }
);

 const modelProduct = mongoose.model("Product", ProductSchema);
 export default modelProduct;
