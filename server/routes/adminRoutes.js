const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyAdmin = require("../middleware/authMiddleware");

const Admin = require("../models/Admin");
const Booking = require("../models/Booking"); 

// Admin Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings
router.get("/bookings", verifyAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ bookingDate: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE booking by ID
router.delete("/bookings/:id", verifyAdmin, async (req, res) => {
  try {
    const bookingId = req.params.id;

    // Validate if booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ 
      message: "Booking deleted successfully",
      deletedBooking: booking
    });

  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;