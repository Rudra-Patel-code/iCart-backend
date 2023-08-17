import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  reviews: [
    {
      rating: { type: Number },
      comment: { type: "String" },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
  stock: {
    type: Number,
    required: true,
  },
  totalRatings: {
    type: Number,
    default: 0,
  },
});

const Products = mongoose.model("product", productSchema);

export default Products;
