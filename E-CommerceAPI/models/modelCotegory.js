import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String }, 
  },
  { timestamps: true }
);

 const modelCategory =  mongoose.model("Category", CategorySchema);
 export default modelCategory;