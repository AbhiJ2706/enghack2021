const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price:{
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  ASIN: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Purchase", PurchaseSchema);

