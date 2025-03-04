import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      }
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" }
  },
  { timestamps: true }
);

const modelOrder = mongoose.model("Order", OrderSchema);
export default modelOrder;
