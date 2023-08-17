import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  identifier: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("category", categorySchema);

export default Category;
