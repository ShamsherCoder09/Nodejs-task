import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

 const modelCategory =  mongoose.model("Category", CategorySchema);
 export default modelCategory;