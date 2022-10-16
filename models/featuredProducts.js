const mongoose = require("mongoose");

const featuredProductSchema = new mongoose.Schema({
  place: {
    type: String,
  },
  items: [
    {
      title: String,
      products: [String],
    },
  ],
});

module.exports = mongoose.model("featured_products", featuredProductSchema);
