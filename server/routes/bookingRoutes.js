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

    // Send confirmation email to customer
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

    // Send email to admin
      await sendEmail(
        process.env.ADMIN_EMAIL,
        "New Booking Alert 🚨",
        `New booking received!

      Name: ${req.body.name}
      Phone: ${req.body.phone}
      Email: ${req.body.email}
      Stay Type: ${req.body.stayType}
      Check-in: ${req.body.checkIn}
      Check-out: ${req.body.checkOut}
      Adults: ${req.body.adults}
      Children: ${req.body.children}`
      );


    res.status(201).json({ message: "Booking saved & email sent" });

  } catch (error) {
    res.status(500).json({ error: error.message });
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
