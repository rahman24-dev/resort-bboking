const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  checkIn: {
    type: String,
    required: true
  },
  checkOut: {
    type: String,
    required: true
  },
  adults: {
    type: Number,
    required: true
  },
  children: {
    type: Number,
    required: true
  },
  stayType: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
