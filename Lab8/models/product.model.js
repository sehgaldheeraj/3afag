const mongoose = require("mongoose");
const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: String,
  category: { type: String, default: "others" },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: String,
});

const Product = mongoose.model("Product", productsSchema);

module.exports = Product;
