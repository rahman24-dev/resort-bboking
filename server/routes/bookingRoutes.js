import express from "express";
import Booking from "../models/Booking.js";
import verifyAdmin from "../middleware/authMiddleware.js";
import sendEmail from "../utils/sendEmail.js";

const router = express.Router();

// Create new booking
router.post("/", async (req, res) => {
  try {
    await sendEmail(
      req.body.email,
      "Nature Heaven Booking Confirmation 🌿",
      `Hello ${req.body.name},

    Your booking is confirmed!

    Stay Type: ${req.body.stayType}
    Check-in: ${req.body.checkIn}
    Check-out: ${req.body.checkOut}
    Adults: ${req.body.adults}
    Children: ${req.body.children}

    Thank you for choosing Nature Heaven 🌿`
    );

    await sendEmail(
      process.env.ADMIN_EMAIL,
      "New Booking Alert 🚨",
      `New booking received!

    Name: ${req.body.name}
    Phone: ${req.body.phone}
    Email: ${req.body.email}`
    );

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
