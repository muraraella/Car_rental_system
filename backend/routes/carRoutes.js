const express = require("express");
const Car = require("../models/Car");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

router.post("/", protect, async (req, res) => {
  const car = new Car(req.body);
  await car.save();
  res.json(car);
});

router.put("/:id", protect, async (req, res) => {
  const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(car);
});

router.delete("/:id", protect, async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
});

module.exports = router;