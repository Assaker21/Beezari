const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  sku: {
    type: String,
  },
  name: {
    type: String,
  },
  brand: {
    type: String,
  },
  long_description: {
    type: String,
  },
  short_description: {
    type: String,
  },
  price: {
    type: Number,
  },
  discounted_price: {
    type: Number,
  },
  images: {
    type: Array,
  },
  categories: [
    {
      category: String,
      subcategory: String,
      microcategory: String,
    },
  ],
  quantity: {
    type: Number,
  },
  purchase_power: {
    type: Number,
  },
});

module.exports = mongoose.model("products", productSchema);
