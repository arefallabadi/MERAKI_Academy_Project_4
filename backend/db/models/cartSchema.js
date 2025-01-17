const mongoose = require("mongoose");

const cart = new mongoose.Schema({
  product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Cart", cart);
