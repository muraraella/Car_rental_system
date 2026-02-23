const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: String,
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
  },
  startDate: Date,
  endDate: Date,
});

module.exports = mongoose.model("Booking", bookingSchema);