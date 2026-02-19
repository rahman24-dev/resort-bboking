const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const verifyAdmin = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");


// Create new booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    return res.status(201).json({ success:true,message: "Booking saved & email sent" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// Get all bookings (Admin use later)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete booking (Admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
