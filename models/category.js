const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  name: {
    type: String,
  },
  sub: [
    {
      name: String,
      micro: Array,
    },
  ],
});

module.exports = mongoose.model("categories", categorySchema);
