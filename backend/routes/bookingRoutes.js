const express = require("express");
const Booking = require("../models/Booking");
const Car = require("../models/Car");

const router = express.Router();

router.post("/", async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();

  await Car.findByIdAndUpdate(req.body.car, { available: false });

  res.json(booking);
});

module.exports = router;