const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const verifyAdmin = require("../middleware/authMiddleware");
const sendEmail = require("../utils/sendEmail");


// Create new booking
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();

    // ✅ 1️⃣ Send confirmation to customer
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: req.body.email,
      subject: "Nature Heaven Booking Confirmation 🌿",
      html: `
        <h2>Booking Confirmed!</h2>
        <p>Hello ${req.body.name},</p>
        <p>Your booking is successfully confirmed.</p>
        <p><b>Booking ID:</b> ${savedBooking._id}</p>
        <ul>
          <li>Stay Type: ${req.body.stayType}</li>
          <li>Check-in: ${req.body.checkIn}</li>
          <li>Check-out: ${req.body.checkOut}</li>
          <li>Adults: ${req.body.adults}</li>
          <li>Children: ${req.body.children}</li>
        </ul>
        <p>Thank you for choosing Nature Heaven 🌿</p>
      `
    });

    // ✅ 2️⃣ Send notification to admin
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.ADMIN_EMAIL,
      subject: "🚨 New Booking Received",
      html: `
        <h2>New Booking Alert</h2>
        <p><b>Booking ID:</b> ${savedBooking._id}</p>
        <ul>
          <li>Name: ${req.body.name}</li>
          <li>Email: ${req.body.email}</li>
          <li>Phone: ${req.body.phone}</li>
          <li>Stay Type: ${req.body.stayType}</li>
          <li>Check-in: ${req.body.checkIn}</li>
          <li>Check-out: ${req.body.checkOut}</li>
          <li>Adults: ${req.body.adults}</li>
          <li>Children: ${req.body.children}</li>
        </ul>
      `
    });

    res.status(201).json({ message: "Booking saved & emails sent" });

  } catch (error) {
    console.error("Email error:", error);
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
