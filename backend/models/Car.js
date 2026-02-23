const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  brand: String,
  pricePerDay: Number,
  available: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Car", carSchema);